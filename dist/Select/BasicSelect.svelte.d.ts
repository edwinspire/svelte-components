export default BasicSelect;
type BasicSelect = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<BasicSelectProps & Record<string, any>>): void;
};
declare const BasicSelect: import("svelte").Component<{
    /**
     * - The static text label rendered as an addon before the select dropdown.
     */
    label?: string | null;
    /**
     * - Whether the control should expand to fill the available width.
     */
    isExpanded?: boolean;
    /**
     * - The currently selected option value. Bound bidirectionally.
     */
    option?: string | number | any;
    /**
     * - An array of objects representing the select options.
     */
    options?: Array<{
        id: string | number;
        value: string;
        enabled?: boolean;
    }>;
    /**
     * - CSS class to apply for styling, specifically related to sizing in Bulma (e.g., 'is-small', 'is-normal').
     */
    css_class?: string;
    /**
     * - Callback triggered when the user selection changes, receives the selected value.
     */
    onselect?: (arg0: {
        value: any;
    }) => void;
} & Record<string, any>, {}, "label" | "option" | "options" | "isExpanded" | "css_class">;
/**
 * Represents the parameters supported by the BasicSelect component.
 */
type BasicSelectProps = {
    /**
     * - The static text label rendered as an addon before the select dropdown.
     */
    label?: string | null;
    /**
     * - Whether the control should expand to fill the available width.
     */
    isExpanded?: boolean;
    /**
     * - The currently selected option value. Bound bidirectionally.
     */
    option?: string | number | any;
    /**
     * - An array of objects representing the select options.
     */
    options?: Array<{
        id: string | number;
        value: string;
        enabled?: boolean;
    }>;
    /**
     * - CSS class to apply for styling, specifically related to sizing in Bulma (e.g., 'is-small', 'is-normal').
     */
    css_class?: string;
    /**
     * - Callback triggered when the user selection changes, receives the selected value.
     */
    onselect?: (arg0: {
        value: any;
    }) => void;
};
