/** @typedef {typeof __propDef.props}  BooleanProps */
/** @typedef {typeof __propDef.events}  BooleanEvents */
/** @typedef {typeof __propDef.slots}  BooleanSlots */
export default class Boolean extends SvelteComponentTyped<{
    value: any;
    row?: {};
    props?: {};
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get row(): {};
}
export type BooleanProps = typeof __propDef.props;
export type BooleanEvents = typeof __propDef.events;
export type BooleanSlots = typeof __propDef.slots;
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
