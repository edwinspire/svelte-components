export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    title?: string;
    data?: any[];
    option?: Record<string, any>;
}, {}, "data" | "option" | "title">;
type $$ComponentProps = {
    title?: string;
    data?: any[];
    option?: Record<string, any>;
};
