export default TreeView;
type TreeView = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const TreeView: import("svelte").Component<{
    value?: any;
    onclick_cell?: Function;
    css_cell?: string;
}, {}, "value">;
type $$ComponentProps = {
    value?: any;
    onclick_cell?: Function;
    css_cell?: string;
};
