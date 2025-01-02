export default Boolean;
type Boolean = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Boolean: import("svelte").Component<{
    onclick_cell: any;
    value?: any;
    row?: any;
    editInline: any;
    custom: any;
    css_cell?: string;
}, {}, "value" | "row">;
type $$ComponentProps = {
    onclick_cell: any;
    value?: any;
    row?: any;
    editInline: any;
    custom: any;
    css_cell?: string;
};
