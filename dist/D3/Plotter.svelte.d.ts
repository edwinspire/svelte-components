/** @typedef {typeof __propDef.props}  PlotterProps */
/** @typedef {typeof __propDef.events}  PlotterEvents */
/** @typedef {typeof __propDef.slots}  PlotterSlots */
export default class Plotter extends SvelteComponentTyped<{
    dataInput?: {
        date: number;
        time: number;
    }[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PlotterProps = typeof __propDef.props;
export type PlotterEvents = typeof __propDef.events;
export type PlotterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        dataInput?: {
            date: number;
            time: number;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
