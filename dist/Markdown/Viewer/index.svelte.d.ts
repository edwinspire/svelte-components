export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    markdown?: string;
    content_class?: string;
}, {}, "markdown" | "content_class">;
type $$ComponentProps = {
    markdown?: string;
    content_class?: string;
};
