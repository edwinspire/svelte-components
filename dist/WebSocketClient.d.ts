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
    constructor(url: string, headers?: any);
    url: string;
    headers: any;
    /** @type {WebSocket|null} */
    ws: WebSocket | null;
    retryCount: number;
    heartbeatTimer: number;
    pongTimeoutTimer: number;
    /**
     * Emits a custom event on this EventTarget instance.
     *
     * @param {string} type - The name of the event to emit.
     * @param {any} [detail] - Optional data payload attached to the event detail property.
     */
    emit(type: string, detail?: any): void;
    /**
     * Subscribes to an event emitted by this client (Node.js EventEmitter pattern style).
     *
     * @param {string} eventName - The name of the event to listen for ('message', 'open', etc.).
     * @param {function(any): void} callback - The callback function executed when the event is emitted. Receives the event `detail` as argument.
     */
    on(eventName: string, callback: (arg0: any) => void): void;
    /**
     * Unsubscribes from an event.
     *
     * @param {string} eventName - The name of the event.
     * @param {EventListener} callback - The original callback function to remove.
     */
    off(eventName: string, callback: EventListener): void;
    /**
     * Establishes the WebSocket connection.
     * Registers internal event handlers for open, message, close, and error events.
     */
    connect(): void;
    /**
     * Starts the heartbeat timer to keep the connection alive by periodically sending `/ping` messages.
     */
    startHeartbeat(): void;
    /**
     * Clears active heartbeat and pong timeout timers.
     */
    cleanupHeartbeat(): void;
    /**
     * Sends a JSON stringified message through the WebSocket if it is open.
     *
     * @param {Object} message - The message object to be stringified and sent.
     */
    send(message: any): void;
    /**
     * Subscribes to a specific channel by sending a `/subscribe` message.
     *
     * @param {string} channel - The name of the channel to subscribe to.
     */
    subscribe(channel: string): void;
    /**
     * Internal handler for parsing received WebSocket messages.
     * Clears pong timeouts if a `/pong` message is received.
     * Emits a 'message' event for all other data.
     *
     * @param {Object} data - The parsed message data from the WebSocket.
     * @param {string} [data.channel] - The channel of the message.
     */
    handleMessage(data: {
        channel?: string;
    }): void;
    /**
     * Attempts to reconnect to the WebSocket server using an exponential backoff strategy.
     */
    reconnect(): void;
    /**
     * Closes the WebSocket connection manually without triggering a reconnection.
     */
    close(): void;
}
