<script>
	import Modal from '../Modal/Modal.svelte';
	/**
	 * Represents the configurable properties for the Dialog Modal component.
	 * 
	 * @typedef {Object} DialogModalProps
	 * @property {boolean} [show=false] - Boolean state to control whether the dialog is open or strictly hidden.
	 * @property {import('svelte').Snippet} [title] - Svelte snippet used to render the card's top header/title text.
	 * @property {function(Event): void} [oncancel] - Function executed when the 'x' button or 'CANCEL' button is clicked.
	 * @property {function(Event): void} [onaccept] - Function executed when the 'ACCEPT' button is clicked.
	 * @property {import('svelte').Snippet} [body] - Svelte snippet used to render the main body logic and text.
	 * @property {string} [label_accept='ACCEPT'] - Text label shown on the primary accept button.
	 * @property {string} [label_cancel='CANCEL'] - Text label shown on the secondary cancel button.
	 */

	/** @type {DialogModalProps & Record<string, any>} */
	let {
		show = $bindable(false),
		title,
		oncancel,
		onaccept,
		body,
		label_accept = 'ACCEPT',
		label_cancel = 'CANCEL'
	} = $props();
</script>

<Modal bind:show>
	<div class="modal-card">
		<header class="modal-card-head has-background-dark">
			<p class="modal-card-title has-text-white">
				<b>
					{@render title?.()}
				</b>
			</p>
			<button
				class="delete"
				aria-label="close"
				onclick={(e) => {
					show = false;
					if (oncancel) {
						oncancel(e);
					}
				}}
			></button>
		</header>
		<section class="modal-card-body">
			{@render body?.()}
		</section>
		<footer class="modal-card-foot has-background-dark">
			<button
				class="button is-success is-small"
				onclick={(e) => {
					if (onaccept) {
						onaccept(e);
					}
				}}
			>
				{label_accept}
			</button>
			<button
				class="button is-small"
				onclick={(e) => {
					show = false;
					if (oncancel) {
						oncancel(e);
					}
				}}
			>
				{label_cancel}
			</button>
		</footer>
	</div>
</Modal>

<style>
	.modal-card-foot,
	.modal-card-head {
		padding: 10px !important;
	}
	.modal-card-title {
		font-size: 1rem !important;
	}
</style>
