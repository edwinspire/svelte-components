<script>
	let {
		label = $bindable(''),
		isExpanded = $bindable(false),
		option = $bindable(''),
		options = $bindable([{ id: 'TEST', value: `TEST`, enabled: true }]),
		css_class = $bindable(' is-small '),
		onselect = (s) => {
			//	console.log('onselect not implemented');
		}
	} = $props();

	function handleClick() {
		onselect({ value: option });
	}
</script>

<div class="field has-addons">
	{#if label && label.length > 0}
		<p class="control ">
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="button is-static {css_class}"> {label} </a>
		</p>
	{/if}

	<p class="control {isExpanded ? 'is-expanded' : ''}">
		<span class="select {css_class}">
			<select bind:value={option} onchange={handleClick}>
				{#if options && Array.isArray(options)}
					{#each options as h}
						<option value={h.id}>
							{h.value}
						</option>
					{/each}
				{/if}
			</select>
		</span>
	</p>
</div>
