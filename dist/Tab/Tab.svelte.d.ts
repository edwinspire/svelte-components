/** @typedef {typeof __propDef.props}  TabProps */
/** @typedef {typeof __propDef.events}  TabEvents */
/** @typedef {typeof __propDef.slots}  TabSlots */
export default class Tab extends SvelteComponentTyped<{
    classSize?: string;
    tabs?: {
        label: string;
        classIcon: string;
        slot: string;
        isActive: boolean;
    }[];
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TabProps = typeof __propDef.props;
export type TabEvents = typeof __propDef.events;
export type TabSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        classSize?: string;
        tabs?: {
            label: string;
            classIcon: string;
            slot: string;
            isActive: boolean;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
