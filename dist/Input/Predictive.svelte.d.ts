/** @typedef {typeof __propDef.props}  PredictiveProps */
/** @typedef {typeof __propDef.events}  PredictiveEvents */
/** @typedef {typeof __propDef.slots}  PredictiveSlots */
export default class Predictive extends SvelteComponentTyped<{
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
export type PredictiveProps = typeof __propDef.props;
export type PredictiveEvents = typeof __propDef.events;
export type PredictiveSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
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
};
export {};
