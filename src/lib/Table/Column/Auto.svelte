<script>
	import { onMount } from 'svelte';
	import TJson from './TreeView.svelte';
	import TBoolean from './Boolean.svelte';
	let initialized = false;
	//	let last_value;
	let {
		value = $bindable(),
		onclickcell,
		row = $bindable(),
		editInline = false,
		css_cell,
		onchangecell
	} = $props();

	$effect(() => {
		value;
		if (initialized && editInline) {
			//console.log(onchangecell);
			//	console.log('Auto', $state.snapshot(value), $state.snapshot(row));
			if (onchangecell) {
				onchangecell(value);
			} else {
				console.warn(
					'Cell component without onchangecell event implemented. The onchangecell event will not be fired when there are changes in the cell value.'
				);
			}
		}
	});

	onMount(() => {
		initialized = true;
	});
</script>

{#if value && (typeof value === 'object' || Array.isArray(value))}
	<TJson bind:value {editInline} {css_cell} />
{:else if typeof value === 'boolean'}
	<TBoolean bind:value bind:row {editInline} {css_cell}></TBoolean>
{:else if typeof value === 'number' || typeof value === 'bigint'}
	<td onclick={onclickcell}
		>{#if editInline}
			<input class="input is-small" type="number" placeholder="Input" bind:value />
		{:else}
			<div class="text_end">{value}</div>
		{/if}</td
	>
{:else if typeof value === 'string'}
	<td onclick={onclickcell}
		>{#if editInline}
			<input class="input is-small" type="text" placeholder="Input" bind:value />
		{:else}
			<div>{value}</div>
		{/if}</td
	>
{:else}
	<td onclick={onclickcell}><span>{JSON.stringify(value)}</span></td>
{/if}

<style>
	.text_end {
		text-align: end;
	}
</style>
