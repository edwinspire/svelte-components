export default Kv;
type Kv = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Kv: import("svelte").Component<{
    data?: any;
}, {}, "data">;
type $$ComponentProps = {
    data?: any;
};
