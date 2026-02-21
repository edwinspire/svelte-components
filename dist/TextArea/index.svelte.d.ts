export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    value?: string;
    label?: any;
    sizeClass?: string;
    isExpanded?: boolean;
    placeholder?: any;
    rows?: number;
} & Record<string, any>, {}, "value" | "label" | "placeholder" | "sizeClass" | "isExpanded" | "rows">;
type $$ComponentProps = {
    value?: string;
    label?: any;
    sizeClass?: string;
    isExpanded?: boolean;
    placeholder?: any;
    rows?: number;
} & Record<string, any>;
