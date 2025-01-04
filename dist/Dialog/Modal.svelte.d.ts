export default Modal;
type Modal = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Modal: import("svelte").Component<{
    Show?: boolean;
    title: any;
    oncancel: any;
    onaccept: any;
    body: any;
    label_accept?: string;
    label_cancel?: string;
}, {}, "Show">;
type $$ComponentProps = {
    Show?: boolean;
    title: any;
    oncancel: any;
    onaccept: any;
    body: any;
    label_accept?: string;
    label_cancel?: string;
};
