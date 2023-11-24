/** @typedef {typeof __propDef.props}  BooleanIconProps */
/** @typedef {typeof __propDef.events}  BooleanIconEvents */
/** @typedef {typeof __propDef.slots}  BooleanIconSlots */
export default class BooleanIcon extends SvelteComponentTyped<{
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
export type BooleanIconProps = typeof __propDef.props;
export type BooleanIconEvents = typeof __propDef.events;
export type BooleanIconSlots = typeof __propDef.slots;
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
