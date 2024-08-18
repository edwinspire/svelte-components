/** @typedef {typeof __propDef.props}  EditorCodeProps */
/** @typedef {typeof __propDef.events}  EditorCodeEvents */
/** @typedef {typeof __propDef.slots}  EditorCodeSlots */
export default class EditorCode extends SvelteComponent<{
    reset?: () => void;
    title?: string;
    lang?: string;
    showFormat?: boolean;
    showSelectLang?: boolean;
    setCode?: (code: any) => void;
    getCode?: () => any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get setCode(): (code: any) => void;
    get getCode(): () => any;
    get reset(): () => void;
}
export type EditorCodeProps = typeof __propDef.props;
export type EditorCodeEvents = typeof __propDef.events;
export type EditorCodeSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        reset?: () => void;
        title?: string;
        lang?: string;
        showFormat?: boolean;
        showSelectLang?: boolean;
        setCode?: (code: any) => void;
        getCode?: () => any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
