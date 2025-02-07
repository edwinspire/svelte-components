export default CodeMirror;
import { minimalSetup } from 'codemirror';
import { basicSetup } from 'codemirror';
type CodeMirror = SvelteComponent<{
    doc: any;
    view?: any;
    verbose?: boolean;
    docStore?: {
        ready: () => boolean;
        subscribe(cb: any): () => any;
        set(newValue: any): void;
    };
}, {
    update: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
} & {
    docStore: {
        ready: () => boolean;
        subscribe(cb: any): () => any;
        set(newValue: any): void;
    };
};
declare const CodeMirror: $$__sveltets_2_IsomorphicComponent<{
    doc: any;
    view?: any;
    verbose?: boolean;
    docStore?: {
        ready: () => boolean;
        subscribe(cb: any): () => any;
        set(newValue: any): void;
    };
}, {
    update: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {
    docStore: {
        ready: () => boolean;
        subscribe(cb: any): () => any;
        set(newValue: any): void;
    };
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
export { minimalSetup, basicSetup };
