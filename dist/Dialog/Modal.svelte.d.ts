export default Modal;
type Modal = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Modal: import("svelte").Component<{
    show?: boolean;
    title: any;
    oncancel: any;
    onaccept: any;
    body: any;
    label_accept?: string;
    label_cancel?: string;
}, {}, "show">;
import Modal from '../Modal/Modal.svelte';
type $$ComponentProps = {
    show?: boolean;
    title: any;
    oncancel: any;
    onaccept: any;
    body: any;
    label_accept?: string;
    label_cancel?: string;
};
