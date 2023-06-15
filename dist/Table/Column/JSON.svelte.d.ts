/** @typedef {typeof __propDef.props}  JsonProps */
/** @typedef {typeof __propDef.events}  JsonEvents */
/** @typedef {typeof __propDef.slots}  JsonSlots */
export default class Json extends SvelteComponentTyped<{
    value: any;
    row?: {};
    props?: {};
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get row(): {};
    get props(): {};
}
export type JsonProps = typeof __propDef.props;
export type JsonEvents = typeof __propDef.events;
export type JsonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        row?: {};
        props?: {};
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
