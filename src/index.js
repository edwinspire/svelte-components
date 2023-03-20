import Table from "./Table/Table.svelte";
import * as types from "./Table/Column/DefaultTypes.js";
import DialogModal from "./Dialog/Modal.svelte";
import {storeChangedTables, WebSocketClient} from "./class/websocket.js";
//import { storeChangedTables, storeChangedTablesUpdate }  from "./Table/storeChangedTables.js";

export { Table, types as ColumnTypes, DialogModal, storeChangedTables, WebSocketClient };
//export { default as DialogModal } from "./Dialog/Modal.svelte";
