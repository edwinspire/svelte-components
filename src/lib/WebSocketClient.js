// websocket_client_browser.js

// ─────────────────────────────────────────────────────────────
// Configuración (ajusta según tu entorno)
// ─────────────────────────────────────────────────────────────
const BEARER_TOKEN = 'tu-token-jwt-aqui'; // Token Bearer
const HEADERS = {
	Authorization: `Bearer ${BEARER_TOKEN}`,
	'X-Custom-Header': 'mi-valor'
};

const HEARTBEAT_INTERVAL = 60 * 1000; // 1 minuto (ping)
const PONG_TIMEOUT = 10 * 1000; // 10s para considerar muerto si no hay pong
const MAX_RECONNECT_DELAY = 30 * 1000; // Máx backoff 30s

// ─────────────────────────────────────────────────────────────
// Cliente WebSocket para navegador con reconexión y heartbeat
// ─────────────────────────────────────────────────────────────
/**
 * WebSocket client specially designed for browser environments with automatic reconnection, heartbeat mechanism, and EventEmitter-like interface.
 * Useful for maintaining a persistent connection to the OpenFusion server.
 * Extends EventTarget to emit and listen to custom events.
 */
export class OpenFusionWebsocketClient extends EventTarget {
	/**
	 * Creates an instance of OpenFusionWebsocketClient.
	 * 
	 * @param {string} url - The WebSocket URL to connect to (e.g., 'wss://example.com/socket').
	 * @param {Object} [headers={}] - Optional headers. Note: standard browser WebSockets do not support custom headers natively.
	 */
	constructor(url, headers = {}) {
		super();
		this.url = url;
		this.headers = headers;
		/** @type {WebSocket|null} */
		this.ws = null;
		this.retryCount = 0;
		this.heartbeatTimer = null;
		this.pongTimeoutTimer = null;
		this.connect();
	}

	/**
	 * Emits a custom event on this EventTarget instance.
	 * 
	 * @param {string} type - The name of the event to emit.
	 * @param {any} [detail] - Optional data payload attached to the event detail property.
	 */
	emit(type, detail) {
		this.dispatchEvent(new CustomEvent(type, { detail }));
	}

	/**
	 * Subscribes to an event emitted by this client (Node.js EventEmitter pattern style).
	 * 
	 * @param {string} eventName - The name of the event to listen for ('message', 'open', etc.).
	 * @param {function(any): void} callback - The callback function executed when the event is emitted. Receives the event `detail` as argument.
	 */
	on(eventName, callback) {
		this.addEventListener(eventName, (event) => callback(event.detail));
	}

	/**
	 * Unsubscribes from an event.
	 * 
	 * @param {string} eventName - The name of the event.
	 * @param {EventListener} callback - The original callback function to remove.
	 */
	off(eventName, callback) {
		this.removeEventListener(eventName, callback);
	}

	/**
	 * Establishes the WebSocket connection.
	 * Registers internal event handlers for open, message, close, and error events.
	 */
	connect() {
		const ws = new WebSocket(this.url);
		this.ws = ws;

		ws.onopen = () => {
			console.log('✅ Conectado al WebSocket');
			this.retryCount = 0;
			this.startHeartbeat();
			this.emit('open', {});
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				this.handleMessage(data);
			} catch (err) {
				console.warn('⚠️ Mensaje no JSON recibido:', event.data);
			}
		};

		ws.onclose = (event) => {
			console.log(`🔌 Conexión cerrada (code=${event.code}, reason=${event.reason || 'ninguna'})`);
			this.cleanupHeartbeat();
			this.reconnect();
		};

		ws.onerror = (error) => {
			console.error('❌ Error en WebSocket:', error.message);
		};
	}

	/**
	 * Starts the heartbeat timer to keep the connection alive by periodically sending `/ping` messages.
	 */
	startHeartbeat() {
		this.cleanupHeartbeat();
		this.heartbeatTimer = setInterval(() => {
			if (this.ws.readyState === WebSocket.OPEN) {
				this.ws.send(JSON.stringify({ channel: '/ping', payload: {} }));

				this.pongTimeoutTimer = setTimeout(() => {
					console.warn('⏰ No se recibió pong a tiempo → Forzando desconexión');
					this.ws.close(4000, 'Pong timeout');
				}, PONG_TIMEOUT);
			}
		}, HEARTBEAT_INTERVAL);
	}

	/**
	 * Clears active heartbeat and pong timeout timers.
	 */
	cleanupHeartbeat() {
		clearInterval(this.heartbeatTimer);
		clearTimeout(this.pongTimeoutTimer);
	}

	/**
	 * Sends a JSON stringified message through the WebSocket if it is open.
	 * 
	 * @param {Object} message - The message object to be stringified and sent.
	 */
	send(message) {
		if (this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		} else {
			console.warn('⚠️ No se puede enviar: conexión no abierta');
		}
	}

	/**
	 * Subscribes to a specific channel by sending a `/subscribe` message.
	 * 
	 * @param {string} channel - The name of the channel to subscribe to.
	 */
	subscribe(channel) {
		this.send({
			payload: { channel },
			channel: '/subscribe'
		});
	}

	/**
	 * Internal handler for parsing received WebSocket messages.
	 * Clears pong timeouts if a `/pong` message is received.
	 * Emits a 'message' event for all other data.
	 * 
	 * @param {Object} data - The parsed message data from the WebSocket.
	 * @param {string} [data.channel] - The channel of the message.
	 */
	handleMessage(data) {
		if (data.channel === '/pong') {
			console.log('❤️ Pong recibido (heartbeat OK)');
			clearTimeout(this.pongTimeoutTimer);
		}
		// ✅ Emitir el evento "message" con los datos
		this.emit('message', data);
	}

	/**
	 * Attempts to reconnect to the WebSocket server using an exponential backoff strategy.
	 */
	reconnect() {
		const delay = Math.min(1000 * 2 ** this.retryCount, MAX_RECONNECT_DELAY);
		this.retryCount++;
		console.log(`🔄 Reintentando conexión en ${delay}ms (intento #${this.retryCount})...`);
		setTimeout(() => this.connect(), delay);
	}

	/**
	 * Closes the WebSocket connection manually without triggering a reconnection.
	 */
	close() {
		this.cleanupHeartbeat();
		if (this.ws) this.ws.close(1000, 'Cierre manual');
	}
}

// ─────────────────────────────────────────────────────────────
// Uso en el navegador
// ─────────────────────────────────────────────────────────────
/*
// Ejemplo de inicialización
const client = new OpenFusionWebsocketClient("wss://tu-servidor.com/socket", HEADERS);

// ✅ Suscribiéndonos con "on" (patrón Node.js)
client.on("message", (data) => {
  console.log("Mensaje recibido:", data);
});

client.on("open", () => {
  console.log("Conexión abierta");
  client.subscribe("notificaciones");
});

// Enviar mensaje después de 2 segundos
setTimeout(() => {
  client.send({ type: "test", data: "Hola desde el navegador" });
}, 2000);
*/