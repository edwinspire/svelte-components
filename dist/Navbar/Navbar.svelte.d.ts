export default Navbar;
type Navbar = SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    title: {};
    start1: {};
    start2: {};
    start3: {};
    start4: {};
    start5: {};
    end1: {};
    end2: {};
    end3: {};
    end4: {};
    end5: {};
}> & {
    $$bindings?: string;
};
declare const Navbar: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    title: {};
    start1: {};
    start2: {};
    start3: {};
    start4: {};
    start5: {};
    end1: {};
    end2: {};
    end3: {};
    end4: {};
    end5: {};
}, {}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
