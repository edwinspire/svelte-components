export default TextLimit;
type TextLimit = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const TextLimit: import("svelte").Component<{
    value?: any;
    onclick_cell?: Function;
    limit?: number;
    css_cell?: string;
    row?: any;
}, {}, "value" | "row">;
type $$ComponentProps = {
    value?: any;
    onclick_cell?: Function;
    limit?: number;
    css_cell?: string;
    row?: any;
};
