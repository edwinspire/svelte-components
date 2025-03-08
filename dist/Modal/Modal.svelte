<script>
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
