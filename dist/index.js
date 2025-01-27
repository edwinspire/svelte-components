// Reexport your entry components here
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Table from './Table/Table.svelte';
import * as types from './Table/Column/DefaultTypes.js';
import DialogModal from './Dialog/Modal.svelte';
import Predictive from './Input/Predictive.svelte';
import Level from './Level/Level.svelte';
import Plotter from './D3/Plotter.svelte';
import Tab from './Tab/Tab.svelte';
import Menu from './Menu/Menu.svelte';
import EditorCode from './EditorCode/EditorCode.svelte';
import BasicSelect from './Select/BasicSelect.svelte';
import SlideFullScreen from './SlideFullScreen/SlideFullScreen.svelte';
import RESTTester from './RESTTester/index.svelte';
import JSONView from './JSONView/index.svelte';
import MenuMega from './MenuMega/index.svelte';

import { storeChangedTables, WebSocketClient } from './class/websocket.js';
import { sha256 } from './class/sha.js';
import { copyTextToClipboard } from './class/browserClipboard.js';
//import { storeChangedTables, storeChangedTablesUpdate }  from "./Table/storeChangedTables.js";

export {
	Table,
	types as ColumnTypes,
	DialogModal,
	storeChangedTables,
	WebSocketClient,
	Predictive as PredictiveInput,
	Level,
	Plotter,
	Tab,
	Menu,
	SlideFullScreen,
	BasicSelect,
	EditorCode,
	sha256,
	RESTTester,
	JSONView,
	copyTextToClipboard,
	MenuMega
};
//export { default as DialogModal } from "./Dialog/Modal.svelte";
