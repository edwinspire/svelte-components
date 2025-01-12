<script>
	let {
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

<div class="select {css_class}">
	<select bind:value={option} onchange={handleClick}>
		{#if options && Array.isArray(options)}
			{#each options as h}
				<option value={h.id}>
					{h.value}
				</option>
			{/each}
		{/if}
	</select>
</div>
