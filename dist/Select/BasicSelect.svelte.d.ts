export default BasicSelect;
type BasicSelect = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const BasicSelect: import("svelte").Component<{
    label?: string;
    isExpanded?: boolean;
    option?: string;
    options?: any[];
    css_class?: string;
    onselect?: Function;
}, {}, "label" | "option" | "options" | "isExpanded" | "css_class">;
type $$ComponentProps = {
    label?: string;
    isExpanded?: boolean;
    option?: string;
    options?: any[];
    css_class?: string;
    onselect?: Function;
};
