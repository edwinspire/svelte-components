/** @typedef {typeof __propDef.props}  TextLimitProps */
/** @typedef {typeof __propDef.events}  TextLimitEvents */
/** @typedef {typeof __propDef.slots}  TextLimitSlots */
export default class TextLimit extends SvelteComponent<{
    value: any;
    props?: {};
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get props(): {};
}
export type TextLimitProps = typeof __propDef.props;
export type TextLimitEvents = typeof __propDef.events;
export type TextLimitSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
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
