<script>
	let show = $state(false);
	let {
		value = $bindable(),
		onclick_cell = () => {},
		limit = 30,
		css_cell = '',
		row = $bindable()
	} = $props();

	function ClickShow() {
		show = !show;
	}
</script>

<td class={css_cell} onclick={onclick_cell}>
	{#if value && typeof value === 'string' && value.length > limit}
		{#if show}
			<div>
				{value}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<span class="btn_show" onclick={ClickShow}> ver menos</span>
			</div>
		{:else}
			<div>
				{value.substring(0, limit)}...
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<span class="btn_show" onclick={ClickShow}> ver más</span>
			</div>
		{/if}
	{:else if typeof value === 'string'}
		<div>
			{value}
		</div>
	{:else}
		<div>{JSON.stringify(value)}</div>
	{/if}
</td>

<style>
	.btn_show {
		color: rgb(0, 34, 145);
		cursor: pointer;
	}
</style>
