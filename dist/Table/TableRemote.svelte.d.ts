/** @typedef {typeof __propDef.props}  TableRemoteProps */
/** @typedef {typeof __propDef.events}  TableRemoteEvents */
/** @typedef {typeof __propDef.slots}  TableRemoteSlots */
export default class TableRemote extends SvelteComponent<{
    url?: string;
    RawDataTable?: any[];
    columns?: {};
    params?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type TableRemoteProps = typeof __propDef.props;
export type TableRemoteEvents = typeof __propDef.events;
export type TableRemoteSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        url?: string;
        RawDataTable?: any[];
        columns?: {};
        params?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
