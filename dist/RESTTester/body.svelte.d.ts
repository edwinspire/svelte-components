export default Body;
type Body = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    getCode: () => void;
    reset: () => void;
};
declare const Body: import("svelte").Component<{
    data?: Record<string, any>;
    onchange?: Function;
}, {
    getCode: () => void;
    reset: () => void;
}, "data">;
type $$ComponentProps = {
    data?: Record<string, any>;
    onchange?: Function;
};
