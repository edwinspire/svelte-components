export default Body;
type Body = SvelteComponent<{
    data?: {
        json: {};
        xml: {};
        text: {};
    };
    getCode?: () => void;
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
} & {
    getCode: () => void;
    reset: () => void;
};
declare const Body: $$__sveltets_2_IsomorphicComponent<{
    data?: {
        json: {};
        xml: {};
        text: {};
    };
    getCode?: () => void;
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    getCode: () => void;
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
