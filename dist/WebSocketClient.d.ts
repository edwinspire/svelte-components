export class OpenFusionWebsocketClient extends EventTarget {
    constructor(url: any, headers?: {});
    url: any;
    headers: {};
    ws: WebSocket;
    retryCount: number;
    heartbeatTimer: number;
    pongTimeoutTimer: number;
    emit(type: any, detail: any): void;
    on(eventName: any, callback: any): void;
    off(eventName: any, callback: any): void;
    connect(): void;
    startHeartbeat(): void;
    cleanupHeartbeat(): void;
    send(message: any): void;
    subscribe(channel: any): void;
    handleMessage(data: any): void;
    reconnect(): void;
    close(): void;
}
