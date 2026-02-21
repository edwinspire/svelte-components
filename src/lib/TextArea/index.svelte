<script>
	let {
		value = $bindable(''),
		label = $bindable(),
		sizeClass = $bindable('is-small'),
		isExpanded = $bindable(true),
		placeholder = $bindable(),
		rows = $bindable(3),
		...rest
	} = $props();
</script>

<div class="field {label != null ? 'has-label' : ''}">
	{#if label != null}
		<p class="control">
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="button is-static {sizeClass} label-textarea"> {label} </a>
		</p>
	{/if}
	<p class="control {isExpanded ? 'is-expanded' : ''}">
		<textarea
			class="textarea {sizeClass} {label != null ? 'textarea-with-label' : ''}"
			{placeholder}
			{rows}
			bind:value
			{...rest}
		></textarea>
	</p>
</div>

<style>
	.has-label .control:first-child {
		margin-bottom: 0 !important;
	}

	.label-textarea {
		border-bottom: none !important;
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	.textarea-with-label {
		border-top-left-radius: 0 !important;
	}
</style>
