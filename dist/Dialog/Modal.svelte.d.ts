/** @typedef {typeof __propDef.props}  ModalProps */
/** @typedef {typeof __propDef.events}  ModalEvents */
/** @typedef {typeof __propDef.slots}  ModalSlots */
export default class Modal extends SvelteComponent<{
    Show?: boolean;
}, {
    cancel: CustomEvent<any>;
    ok: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    title: {};
    body: {};
    'label-ok': {};
    'label-cancel': {};
}> {
}
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        Show?: boolean;
    };
    events: {
        cancel: CustomEvent<any>;
        ok: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        title: {};
        body: {};
        'label-ok': {};
        'label-cancel': {};
    };
    exports?: {};
    bindings?: string;
};
export {};
