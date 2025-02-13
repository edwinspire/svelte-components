export default EditorCode;
type EditorCode = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    setCode: (new_code: any) => void;
    getCode: () => any;
    reset: () => void;
};
declare const EditorCode: import("svelte").Component<{
    code?: string;
    left: any;
    right: any;
    lang?: string;
    showFormat?: boolean;
    showSelectLang?: boolean;
    isReadOnly?: boolean;
    showHiddenButton?: boolean;
    showResetButton?: boolean;
    showCode?: boolean;
    onchange?: Function;
}, {
    setCode: (new_code: any) => void;
    getCode: () => any;
    reset: () => void;
}, "code" | "lang" | "showFormat" | "showSelectLang" | "isReadOnly" | "showHiddenButton" | "showResetButton" | "showCode">;
type $$ComponentProps = {
    code?: string;
    left: any;
    right: any;
    lang?: string;
    showFormat?: boolean;
    showSelectLang?: boolean;
    isReadOnly?: boolean;
    showHiddenButton?: boolean;
    showResetButton?: boolean;
    showCode?: boolean;
    onchange?: Function;
};
