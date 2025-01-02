export default Auto;
type Auto = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Auto: import("svelte").Component<{
    value?: any;
    onclick_cell: any;
    row?: any;
    editInline?: boolean;
    css_cell: any;
}, {}, "value" | "row">;
type $$ComponentProps = {
    value?: any;
    onclick_cell: any;
    row?: any;
    editInline?: boolean;
    css_cell: any;
};
