export default EditorCode;
type EditorCode = SvelteComponent<{
    left?: any;
    right?: any;
    code?: string;
    onchange?: any;
    lang?: string;
    showFormat?: boolean;
    showSelectLang?: boolean;
    isReadOnly?: boolean;
    showHiddenButton?: boolean;
    showResetButton?: boolean;
    showCode?: boolean;
    setCode?: (newCode: any) => void;
    getCode?: () => any;
    reset?: () => void;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
} & {
    setCode: (newCode: any) => void;
    getCode: () => any;
    reset: () => void;
};
declare const EditorCode: $$__sveltets_2_IsomorphicComponent<{
    left?: any;
    right?: any;
    code?: string;
    onchange?: any;
    lang?: string;
    showFormat?: boolean;
    showSelectLang?: boolean;
    isReadOnly?: boolean;
    showHiddenButton?: boolean;
    showResetButton?: boolean;
    showCode?: boolean;
    setCode?: (newCode: any) => void;
    getCode?: () => any;
    reset?: () => void;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {
    setCode: (newCode: any) => void;
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
