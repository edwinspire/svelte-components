/** @typedef {typeof __propDef.props}  PredictiveOrgProps */
/** @typedef {typeof __propDef.events}  PredictiveOrgEvents */
/** @typedef {typeof __propDef.slots}  PredictiveOrgSlots */
export default class PredictiveOrg extends SvelteComponent<{
    label?: string;
    options?: {
        name: string;
        value: number;
    }[];
}, {
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PredictiveOrgProps = typeof __propDef.props;
export type PredictiveOrgEvents = typeof __propDef.events;
export type PredictiveOrgSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        options?: {
            name: string;
            value: number;
        }[];
    };
    events: {
        select: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
