<script>
	import TJson from './TreeView .svelte';
	import TBoolean from './Boolean.svelte';

	let {
		value = $bindable(),
		onclick_cell,
		row = $bindable(),
		editInline = false,
		css_cell
	} = $props();

	function stringIsValidJSON(input) {
		//    console.log(row);
		if (typeof input === 'string') {
			try {
				let x = JSON.parse(input);
				return true;
			} catch (error) {
				return false;
			}
		} else {
			return false;
		}
	}
</script>

{#if value && (typeof value === 'object' || Array.isArray(value))}
	<TJson {value} {editInline} {css_cell} />
{:else if typeof value === 'boolean'}
	<TBoolean bind:value bind:row {editInline} {css_cell}></TBoolean>
{:else if typeof value === 'number' || typeof value === 'bigint'}
	<td onclick={onclick_cell}
		>{#if editInline}
			<input class="input is-small" type="number" placeholder="Input" bind:value />
		{:else}
			<div class="text_end">{value}</div>
		{/if}</td
	>
{:else if typeof value === 'string'}
	<td onclick={onclick_cell}
		>{#if editInline}
			<input class="input is-small" type="text" placeholder="Input" bind:value />
		{:else}
			<div>{value}</div>
		{/if}</td
	>
{:else}
	<td onclick={onclick_cell}><span>{JSON.stringify(value)}</span></td>
{/if}

<style>
	.text_end {
		text-align: end;
	}
</style>
