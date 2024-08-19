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
    isReadOnly?: boolean;
    showHiddenButton?: boolean;
    showResetButton?: boolean;
    showCode?: boolean;
    setCode?: (new_code: any) => void;
    getCode?: () => any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    slot: {};
}> {
    get setCode(): (new_code: any) => void;
    get getCode(): () => any;
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
        isReadOnly?: boolean;
        showHiddenButton?: boolean;
        showResetButton?: boolean;
        showCode?: boolean;
        setCode?: (new_code: any) => void;
        getCode?: () => any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        slot: {};
    };
    exports?: {};
    bindings?: string;
};
export {};
