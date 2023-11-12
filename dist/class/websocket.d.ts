export const storeChangedTables: import("svelte/store").Writable<{}>;
declare const WebSocketClient_base: typeof import("events");
export class WebSocketClient extends WebSocketClient_base {
    connect(): WebSocket;
    websocket: WebSocket;
}
export {};
