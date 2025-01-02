export const storeChangedTables: import("svelte/store").Writable<{}>;
export class WebSocketClient extends EventEmitter<[never]> {
    constructor();
    connect(): WebSocket;
    websocket: WebSocket;
}
import { EventEmitter } from 'events';
