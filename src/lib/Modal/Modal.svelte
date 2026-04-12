<script>
	/**
	 * Represents the parameters supported by the base Modal component.
	 * 
	 * @typedef {Object} ModalProps
	 * @property {boolean} [show=false] - Controls the active/visible state of the modal.
	 * @property {import('svelte').Snippet} [children] - The Svelte snippet representing the body/content of the modal.
	 * @property {boolean} [showCloseButton=false] - Determines if a large top-right closing 'X' button should be displayed.
	 */

	/** @type {ModalProps & Record<string, any>} */
	let { show = $bindable(false), children, showCloseButton = $bindable(false) } = $props();
</script>

<div class="modal" class:is-active={show}>
	<div class="modal-background"></div>

	<div class="modal-content">
		{@render children?.()}
	</div>

	{#if showCloseButton}
		<button
			class="modal-close is-large"
			aria-label="close"
			onclick={() => {
				show = false;
			}}
		></button>
	{/if}
</div>
