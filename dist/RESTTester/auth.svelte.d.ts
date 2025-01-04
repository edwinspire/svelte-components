export default Auth;
type Auth = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Auth: import("svelte").Component<{
    data?: Record<string, any>;
}, {}, "data">;
type $$ComponentProps = {
    data?: Record<string, any>;
};
