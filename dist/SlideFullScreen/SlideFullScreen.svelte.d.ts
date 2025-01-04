export default SlideFullScreen;
type SlideFullScreen = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const SlideFullScreen: import("svelte").Component<{
    show?: boolean;
    children: any;
}, {}, "show">;
type $$ComponentProps = {
    show?: boolean;
    children: any;
};
