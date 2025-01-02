export default Predictive;
type Predictive = SvelteComponent<{
    label?: string;
    options?: {
        name: string;
        value: string;
    }[];
    selectedValue?: string;
    classLabel?: string;
    classInput?: string;
    placeholder?: string;
}, {
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
};
declare const Predictive: $$__sveltets_2_IsomorphicComponent<{
    label?: string;
    options?: {
        name: string;
        value: string;
    }[];
    selectedValue?: string;
    classLabel?: string;
    classInput?: string;
    placeholder?: string;
}, {
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
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
