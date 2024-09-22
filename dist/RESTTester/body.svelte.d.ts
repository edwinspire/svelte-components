/** @typedef {typeof __propDef.props}  BodyProps */
/** @typedef {typeof __propDef.events}  BodyEvents */
/** @typedef {typeof __propDef.slots}  BodySlots */
export default class Body extends SvelteComponent<{
    data?: {
        js: {};
        xml: {};
        text: {};
    };
    reset?: () => void;
    getCode?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get getCode(): () => void;
    get reset(): () => void;
}
export type BodyProps = typeof __propDef.props;
export type BodyEvents = typeof __propDef.events;
export type BodySlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        data?: {
            js: {};
            xml: {};
            text: {};
        };
        reset?: () => void;
        getCode?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
