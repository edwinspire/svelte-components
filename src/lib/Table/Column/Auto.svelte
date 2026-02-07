<script>
	import { onMount } from 'svelte';
	import TJson from './TreeView.svelte';
	import TBoolean from './Boolean.svelte';
	import DateTime from './DateTime.svelte';

	let initialized = false;

	let {
		value = $bindable(),
		onclick_cell,
		row = $bindable(),
		editInline = false,
		css_cell,
		onchangecell
	} = $props();

	$effect(() => {
		// Detect changes in value or row
		// Using $state.snapshot to avoid infinite loops if objects are mutated deeply
		// but simple access is enough for primitive values or reference changes.
		// However, the previous code was weird accessing value; effectively just to subscribe.
		value;

		if (initialized && editInline && onchangecell) {
			onchangecell(value);
		} else if (initialized && editInline && !onchangecell) {
			console.warn(
				'Cell component without onchangecell event implemented. The onchangecell event will not be fired when there are changes in the cell value.'
			);
		}
	});

	onMount(() => {
		initialized = true;
	});
</script>

{#if typeof value === 'boolean'}
	<TBoolean bind:value bind:row {editInline} {css_cell} {onclick_cell}></TBoolean>

	<!-- Check for Date object. 
     Note: typeof new Date() is 'object', so this must come before the generic object check. -->
{:else if value instanceof Date}
	<DateTime bind:value {row} {editInline} {css_cell} {onclick_cell} />
{:else if value && (typeof value === 'object' || Array.isArray(value))}
	<TJson bind:value {editInline} {css_cell} {onclick_cell} />
{:else if typeof value === 'number' || typeof value === 'bigint'}
	<td onclick={onclick_cell} class={css_cell}
		>{#if editInline}
			<input class="input is-small" type="number" placeholder="Input" bind:value />
		{:else}
			<div class="text_end">{value}</div>
		{/if}</td
	>
{:else if typeof value === 'string'}
	<td onclick={onclick_cell} class={css_cell}
		>{#if editInline}
			<input class="input is-small" type="text" placeholder="Input" bind:value />
		{:else}
			<div>{value}</div>
		{/if}</td
	>
{:else}
	<td onclick={onclick_cell} class={css_cell}><span>{JSON.stringify(value)}</span></td>
{/if}

<style>
	.text_end {
		text-align: end;
	}
</style>
