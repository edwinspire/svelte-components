/** @typedef {typeof __propDef.props}  DateTimeProps */
/** @typedef {typeof __propDef.events}  DateTimeEvents */
/** @typedef {typeof __propDef.slots}  DateTimeSlots */
export default class DateTime extends SvelteComponentTyped<{
    props: any;
    value: any;
    row?: {};
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get row(): {};
}
export type DateTimeProps = typeof __propDef.props;
export type DateTimeEvents = typeof __propDef.events;
export type DateTimeSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        props: any;
        value: any;
        row?: {};
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
