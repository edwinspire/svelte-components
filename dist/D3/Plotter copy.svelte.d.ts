/** @typedef {typeof __propDef.props}  PlottercopyProps */
/** @typedef {typeof __propDef.events}  PlottercopyEvents */
/** @typedef {typeof __propDef.slots}  PlottercopySlots */
export default class Plottercopy extends SvelteComponentTyped<{
    dataInput?: {
        date: number;
        time: number;
    }[];
    limitData?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PlottercopyProps = typeof __propDef.props;
export type PlottercopyEvents = typeof __propDef.events;
export type PlottercopySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        dataInput?: {
            date: number;
            time: number;
        }[];
        limitData?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
