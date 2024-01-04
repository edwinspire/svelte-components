/** @typedef {typeof __propDef.props}  CellJsonProps */
/** @typedef {typeof __propDef.events}  CellJsonEvents */
/** @typedef {typeof __propDef.slots}  CellJsonSlots */
export default class CellJson extends SvelteComponent<{
    value: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellJsonProps = typeof __propDef.props;
export type CellJsonEvents = typeof __propDef.events;
export type CellJsonSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
