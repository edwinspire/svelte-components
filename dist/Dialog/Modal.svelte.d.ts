export default Modal;
type Modal = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<DialogModalProps & Record<string, any>>): void;
};
declare const Modal: import("svelte").Component<{
    /**
     * - Boolean state to control whether the dialog is open or strictly hidden.
     */
    show?: boolean;
    /**
     * - Svelte snippet used to render the card's top header/title text.
     */
    title?: import("svelte").Snippet;
    /**
     * - Function executed when the 'x' button or 'CANCEL' button is clicked.
     */
    oncancel?: (arg0: Event) => void;
    /**
     * - Function executed when the 'ACCEPT' button is clicked.
     */
    onaccept?: (arg0: Event) => void;
    /**
     * - Svelte snippet used to render the main body logic and text.
     */
    body?: import("svelte").Snippet;
    /**
     * - Text label shown on the primary accept button.
     */
    label_accept?: string;
    /**
     * - Text label shown on the secondary cancel button.
     */
    label_cancel?: string;
} & Record<string, any>, {}, "show">;
import Modal from '../Modal/Modal.svelte';
/**
 * Represents the configurable properties for the Dialog Modal component.
 */
type DialogModalProps = {
    /**
     * - Boolean state to control whether the dialog is open or strictly hidden.
     */
    show?: boolean;
    /**
     * - Svelte snippet used to render the card's top header/title text.
     */
    title?: import("svelte").Snippet;
    /**
     * - Function executed when the 'x' button or 'CANCEL' button is clicked.
     */
    oncancel?: (arg0: Event) => void;
    /**
     * - Function executed when the 'ACCEPT' button is clicked.
     */
    onaccept?: (arg0: Event) => void;
    /**
     * - Svelte snippet used to render the main body logic and text.
     */
    body?: import("svelte").Snippet;
    /**
     * - Text label shown on the primary accept button.
     */
    label_accept?: string;
    /**
     * - Text label shown on the secondary cancel button.
     */
    label_cancel?: string;
};
