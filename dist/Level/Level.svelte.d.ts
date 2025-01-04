export default Level;
type Level = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Level: import("svelte").Component<{
    left: any;
    right: any;
}, {}, "">;
type $$ComponentProps = {
    left: any;
    right: any;
};
