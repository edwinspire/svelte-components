/** @typedef {typeof __propDef.props}  BasicSelectProps */
/** @typedef {typeof __propDef.events}  BasicSelectEvents */
/** @typedef {typeof __propDef.slots}  BasicSelectSlots */
export default class BasicSelect extends SvelteComponentTyped<{
    option?: string;
    options?: {
        id: string;
        value: string;
        enabled: boolean;
    }[];
    css_class?: string;
}, {
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type BasicSelectProps = typeof __propDef.props;
export type BasicSelectEvents = typeof __propDef.events;
export type BasicSelectSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        option?: string;
        options?: {
            id: string;
            value: string;
            enabled: boolean;
        }[];
        css_class?: string;
    };
    events: {
        select: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
