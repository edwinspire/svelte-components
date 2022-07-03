import Table from "./Table/Table.svelte";
const types = require("./Table/Column/DefaultTypes.js");
import DialogModal from "./Dialog/Modal.svelte";
import {storeChangedTables, WebSocketClient} from "./socketio-client";
//import { storeChangedTables, storeChangedTablesUpdate }  from "./Table/storeChangedTables.js";

export { Table, types as ColumnTypes, DialogModal, storeChangedTables, WebSocketClient };
//export { default as DialogModal } from "./Dialog/Modal.svelte";
