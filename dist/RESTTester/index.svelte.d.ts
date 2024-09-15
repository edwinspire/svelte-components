/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponent<{
    url: any;
    method?: string;
    data?: {
        query: any[];
        headers: any[];
        auth: {};
        body: {};
    };
    limitSizeResponseView?: number;
    methodDisabled?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        url: any;
        method?: string;
        data?: {
            query: any[];
            headers: any[];
            auth: {};
            body: {};
        };
        limitSizeResponseView?: number;
        methodDisabled?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
