export default Modal;
type Modal = SvelteComponent<{
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
}> & {
    $$bindings?: string;
};
declare const Modal: $$__sveltets_2_IsomorphicComponent<{
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
}, {}, string>;
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
