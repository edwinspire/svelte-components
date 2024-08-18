/** @typedef {typeof __propDef.props}  EditorCodeProps */
/** @typedef {typeof __propDef.events}  EditorCodeEvents */
/** @typedef {typeof __propDef.slots}  EditorCodeSlots */
export default class EditorCode extends SvelteComponent<{
    code?: string;
    reset?: () => void;
    title?: string;
    lang?: string;
    showFormat?: boolean;
    showSelectLang?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get reset(): () => void;
}
export type EditorCodeProps = typeof __propDef.props;
export type EditorCodeEvents = typeof __propDef.events;
export type EditorCodeSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        code?: string;
        reset?: () => void;
        title?: string;
        lang?: string;
        showFormat?: boolean;
        showSelectLang?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
