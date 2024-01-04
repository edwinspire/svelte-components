/** @typedef {typeof __propDef.props}  SlideFullScreenProps */
/** @typedef {typeof __propDef.events}  SlideFullScreenEvents */
/** @typedef {typeof __propDef.slots}  SlideFullScreenSlots */
export default class SlideFullScreen extends SvelteComponent<{
    show?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type SlideFullScreenProps = typeof __propDef.props;
export type SlideFullScreenEvents = typeof __propDef.events;
export type SlideFullScreenSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        show?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
