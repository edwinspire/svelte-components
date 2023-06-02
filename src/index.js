import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Table from "./Table/Table.svelte";
import * as types from "./Table/Column/DefaultTypes.js";
import DialogModal from "./Dialog/Modal.svelte";
import Predictive from "./Input/Predictive.svelte";
import {storeChangedTables, WebSocketClient} from "./class/websocket.js";
//import { storeChangedTables, storeChangedTablesUpdate }  from "./Table/storeChangedTables.js";

export { Table, types as ColumnTypes, DialogModal, storeChangedTables, WebSocketClient, Predictive as PredictiveInput};
//export { default as DialogModal } from "./Dialog/Modal.svelte";
