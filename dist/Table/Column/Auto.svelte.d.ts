/** @typedef {typeof __propDef.props}  AutoProps */
/** @typedef {typeof __propDef.events}  AutoEvents */
/** @typedef {typeof __propDef.slots}  AutoSlots */
export default class Auto extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AutoProps = typeof __propDef.props;
export type AutoEvents = typeof __propDef.events;
export type AutoSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
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
    exports?: {};
    bindings?: string;
};
export {};
