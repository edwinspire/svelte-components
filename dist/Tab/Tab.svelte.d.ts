export default Tab;
type Tab = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<TabProps & Record<string, any>>): void;
};
declare const Tab: import("svelte").Component<{
    /**
     * - The Bulma size class for the tabs (e.g., 'is-small', 'is-medium', 'is-large').
     */
    classSize?: string;
    /**
     * - Event callback fired when a tab is clicked. Receives an object with tab details.
     */
    onselect?: (arg0: any) => void;
    /**
     * - Definition array for rendering the tabs.
     */
    tabs?: Array<{
        label: string;
        classIcon?: string;
        disabled?: boolean;
        component?: import("svelte").Snippet;
        alias?: string;
    }>;
    /**
     * - The index of the currently active/selected tab.
     */
    active?: number;
    /**
     * - Optional snippet rendered at the bottom of the active tab.
     */
    children?: import("svelte").Snippet;
} & Record<string, any>, {}, "classSize" | "tabs" | "active">;
/**
 * Represents the properties available for the Tab component.
 */
type TabProps = {
    /**
     * - The Bulma size class for the tabs (e.g., 'is-small', 'is-medium', 'is-large').
     */
    classSize?: string;
    /**
     * - Event callback fired when a tab is clicked. Receives an object with tab details.
     */
    onselect?: (arg0: any) => void;
    /**
     * - Definition array for rendering the tabs.
     */
    tabs?: Array<{
        label: string;
        classIcon?: string;
        disabled?: boolean;
        component?: import("svelte").Snippet;
        alias?: string;
    }>;
    /**
     * - The index of the currently active/selected tab.
     */
    active?: number;
    /**
     * - Optional snippet rendered at the bottom of the active tab.
     */
    children?: import("svelte").Snippet;
};
