export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<InputProps & Record<string, any>>): void;
};
declare const Index: import("svelte").Component<{
    /**
     * - Text that appears in the input element when it has no value set.
     */
    placeholder?: string;
    /**
     * - The type of input to render ('text', 'number', 'date', 'datetime-local', 'file', 'checkbox', 'boolean').
     */
    type?: string;
    /**
     * - The text label to display adjacent to the input field.
     */
    label?: string | null;
    /**
     * - The current value of the input. Can be a string, number, or boolean depending on the type.
     */
    value?: any;
    /**
     * - Bulma CSS class for input sizing (e.g., 'is-small', 'is-normal', 'is-large').
     */
    sizeClass?: string;
    /**
     * - Additional CSS classes applied exclusively to the label element.
     */
    labelClass?: string;
    /**
     * - Minimum value allowed, used primarily for number or date types.
     */
    min?: number | string;
    /**
     * - Maximum value allowed.
     */
    max?: number | string;
    /**
     * - Step value for numeric or date inputs.
     */
    step?: number | string;
    /**
     * - Whether the control should span the full width of its container (adds 'is-expanded' class).
     */
    isExpanded?: boolean;
    /**
     * - File types accepted when type is 'file' (e.g., 'image/png', '.csv').
     */
    accept?: string;
    /**
     * - The endpoint URL used when uploading files.
     */
    url?: string;
    /**
     * - Whether multiple files can be selected if type is 'file'.
     */
    multiple?: boolean;
    /**
     * - Callback triggered when files are selected (for type 'file').
     */
    onselect?: Function;
    /**
     * - Callback triggered when files are uploaded successfully (for type 'file').
     */
    onupload?: Function;
    /**
     * - Standard change event callback whenever the input value changes.
     */
    onchange?: Function;
    /**
     * - Controls visibility of the upload button in the FileUpload component.
     */
    showUploadButton?: boolean;
    /**
     * - A regular expression that the input's value must match.
     */
    pattern?: string;
    /**
     * - Specifies if the input is mandatory.
     */
    required?: boolean;
} & Record<string, any>, {}, "value" | "type" | "min" | "max" | "label" | "placeholder" | "accept" | "showUploadButton" | "sizeClass" | "labelClass" | "step" | "isExpanded" | "pattern" | "required">;
/**
 * Represents the parameters supported by the basic Input component.
 */
type InputProps = {
    /**
     * - Text that appears in the input element when it has no value set.
     */
    placeholder?: string;
    /**
     * - The type of input to render ('text', 'number', 'date', 'datetime-local', 'file', 'checkbox', 'boolean').
     */
    type?: string;
    /**
     * - The text label to display adjacent to the input field.
     */
    label?: string | null;
    /**
     * - The current value of the input. Can be a string, number, or boolean depending on the type.
     */
    value?: any;
    /**
     * - Bulma CSS class for input sizing (e.g., 'is-small', 'is-normal', 'is-large').
     */
    sizeClass?: string;
    /**
     * - Additional CSS classes applied exclusively to the label element.
     */
    labelClass?: string;
    /**
     * - Minimum value allowed, used primarily for number or date types.
     */
    min?: number | string;
    /**
     * - Maximum value allowed.
     */
    max?: number | string;
    /**
     * - Step value for numeric or date inputs.
     */
    step?: number | string;
    /**
     * - Whether the control should span the full width of its container (adds 'is-expanded' class).
     */
    isExpanded?: boolean;
    /**
     * - File types accepted when type is 'file' (e.g., 'image/png', '.csv').
     */
    accept?: string;
    /**
     * - The endpoint URL used when uploading files.
     */
    url?: string;
    /**
     * - Whether multiple files can be selected if type is 'file'.
     */
    multiple?: boolean;
    /**
     * - Callback triggered when files are selected (for type 'file').
     */
    onselect?: Function;
    /**
     * - Callback triggered when files are uploaded successfully (for type 'file').
     */
    onupload?: Function;
    /**
     * - Standard change event callback whenever the input value changes.
     */
    onchange?: Function;
    /**
     * - Controls visibility of the upload button in the FileUpload component.
     */
    showUploadButton?: boolean;
    /**
     * - A regular expression that the input's value must match.
     */
    pattern?: string;
    /**
     * - Specifies if the input is mandatory.
     */
    required?: boolean;
};
