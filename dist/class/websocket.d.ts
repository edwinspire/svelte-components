export const storeChangedTables: import("svelte/store").Writable<{}>;
export class WebSocketClient extends EventEmitter {
    constructor();
    connect(): WebSocket;
    websocket: WebSocket;
}
import { EventEmitter } from 'events';
