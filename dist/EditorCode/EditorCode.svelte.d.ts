export default EditorCode;
type EditorCode = SvelteComponent<{
    code?: string;
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
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    left: {};
    right: {};
}> & {
    $$bindings?: string;
} & {
    setCode: (new_code: any) => void;
    getCode: () => any;
    reset: () => void;
};
declare const EditorCode: $$__sveltets_2_IsomorphicComponent<{
    code?: string;
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
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    left: {};
    right: {};
}, {
    setCode: (new_code: any) => void;
    getCode: () => any;
    reset: () => void;
}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
