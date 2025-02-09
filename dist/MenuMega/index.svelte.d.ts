export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    brand?: any[];
    start?: any[];
    end?: any[];
}, {}, "end" | "start" | "brand">;
type $$ComponentProps = {
    brand?: any[];
    start?: any[];
    end?: any[];
};
