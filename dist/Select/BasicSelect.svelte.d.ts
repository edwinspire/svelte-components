export default BasicSelect;
type BasicSelect = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const BasicSelect: import("svelte").Component<{
    option?: string;
    options?: any[];
    css_class?: string;
    onselect?: Function;
}, {}, "option" | "options" | "css_class">;
type $$ComponentProps = {
    option?: string;
    options?: any[];
    css_class?: string;
    onselect?: Function;
};
