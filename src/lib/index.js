// Reexport your entry components here
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Table from "./Table/Table.svelte";
import * as types from "./Table/Column/DefaultTypes.js";
import DialogModal from "./Dialog/Modal.svelte";
import Predictive from "./Input/Predictive.svelte";
import Level from "./Level/Level.svelte";
import Plotter from "./D3/Plotter.svelte";
import {storeChangedTables, WebSocketClient} from "./class/websocket.js";
//import { storeChangedTables, storeChangedTablesUpdate }  from "./Table/storeChangedTables.js";

export { Table, types as ColumnTypes, DialogModal, storeChangedTables, WebSocketClient, Predictive as PredictiveInput, Level, Plotter};
//export { default as DialogModal } from "./Dialog/Modal.svelte";
