export default Auto;
type Auto = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Auto: import("svelte").Component<{
    value?: any;
    onclickcell: any;
    row?: any;
    editInline?: boolean;
    css_cell: any;
    onchangecell: any;
}, {}, "value" | "row">;
type $$ComponentProps = {
    value?: any;
    onclickcell: any;
    row?: any;
    editInline?: boolean;
    css_cell: any;
    onchangecell: any;
};
