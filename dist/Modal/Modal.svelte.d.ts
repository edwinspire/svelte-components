export default Modal;
type Modal = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Modal: import("svelte").Component<{
    show?: boolean;
    children: any;
    showCloseButton?: boolean;
}, {}, "show" | "showCloseButton">;
type $$ComponentProps = {
    show?: boolean;
    children: any;
    showCloseButton?: boolean;
};
