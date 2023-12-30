/** @typedef {typeof __propDef.props}  SlideFullScreenProps */
/** @typedef {typeof __propDef.events}  SlideFullScreenEvents */
/** @typedef {typeof __propDef.slots}  SlideFullScreenSlots */
export default class SlideFullScreen extends SvelteComponentTyped<{
    show?: boolean;
}, {
    keydown: KeyboardEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type SlideFullScreenProps = typeof __propDef.props;
export type SlideFullScreenEvents = typeof __propDef.events;
export type SlideFullScreenSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        show?: boolean;
    };
    events: {
        keydown: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
