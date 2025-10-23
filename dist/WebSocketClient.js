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
export class OpenFusionWebsocketClient extends EventTarget {
	constructor(url, headers = {}) {
		super();
		this.url = url;
		this.headers = headers;
		this.ws = null;
		this.retryCount = 0;
		this.heartbeatTimer = null;
		this.pongTimeoutTimer = null;
		this.connect();
	}

	// Método para emitir eventos (simula EventEmitter de Node.js)
	emit(type, detail) {
		this.dispatchEvent(new CustomEvent(type, { detail }));
	}

	// ✅ Nuevo: Método "on" para suscribirse a eventos (patrón Node.js)
	on(eventName, callback) {
		this.addEventListener(eventName, (event) => callback(event.detail));
	}

	// ✅ Nuevo: Método "off" para eliminar suscripciones
	off(eventName, callback) {
		this.removeEventListener(eventName, callback);
	}

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

	cleanupHeartbeat() {
		clearInterval(this.heartbeatTimer);
		clearTimeout(this.pongTimeoutTimer);
	}

	send(message) {
		if (this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		} else {
			console.warn('⚠️ No se puede enviar: conexión no abierta');
		}
	}

	subscribe(channel) {
		this.send({
			payload: { channel },
			channel: '/subscribe'
		});
	}

	handleMessage(data) {
		if (data.channel === '/pong') {
			console.log('❤️ Pong recibido (heartbeat OK)');
			clearTimeout(this.pongTimeoutTimer);
		}
		// ✅ Emitir el evento "message" con los datos
		this.emit('message', data);
	}

	reconnect() {
		const delay = Math.min(1000 * 2 ** this.retryCount, MAX_RECONNECT_DELAY);
		this.retryCount++;
		console.log(`🔄 Reintentando conexión en ${delay}ms (intento #${this.retryCount})...`);
		setTimeout(() => this.connect(), delay);
	}

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