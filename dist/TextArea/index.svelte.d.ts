export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<TextAreaProps & Record<string, any>>): void;
};
declare const Index: import("svelte").Component<{
    /**
     * - Bound active text string content inside the text area.
     */
    value?: string;
    /**
     * - Optional descriptive label rendered as a static add-on style above the text field.
     */
    label?: string | null;
    /**
     * - The size modifier class for Bulma styling (e.g. 'is-small', 'is-normal').
     */
    sizeClass?: string;
    /**
     * - Allows the textarea width to stretch natively inside flex/flow containers.
     */
    isExpanded?: boolean;
    /**
     * - Text that appears when the textarea is empty.
     */
    placeholder?: string;
    /**
     * - Initial height in number of text rows.
     */
    rows?: number;
} & Record<string, any>, {}, "value" | "label" | "placeholder" | "sizeClass" | "isExpanded" | "rows">;
/**
 * Represents the properties available for the custom TextArea component.
 */
type TextAreaProps = {
    /**
     * - Bound active text string content inside the text area.
     */
    value?: string;
    /**
     * - Optional descriptive label rendered as a static add-on style above the text field.
     */
    label?: string | null;
    /**
     * - The size modifier class for Bulma styling (e.g. 'is-small', 'is-normal').
     */
    sizeClass?: string;
    /**
     * - Allows the textarea width to stretch natively inside flex/flow containers.
     */
    isExpanded?: boolean;
    /**
     * - Text that appears when the textarea is empty.
     */
    placeholder?: string;
    /**
     * - Initial height in number of text rows.
     */
    rows?: number;
};
