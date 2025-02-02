<script>
	import { DateTime } from 'luxon';

	let {
		value = $bindable(),
		onclick_cell = () => {},
		row = $bindable(),
		format = 'yyyy-MM-dd HH:mm:ss',
		fromFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
		HighlightIsntToday = false,
		editInline = false,
		css_cell = ''
	} = $props();

	let DC001 = $derived(
		HighlightIsntToday &&
			DateTime.fromISO(value).toFormat('yyyy-MM-dd') !== DateTime.local().toFormat('yyyy-MM-dd')
	);
	let value_formated = $derived(fn_DC01());

	function fn_DC01() {
		try {
			return DateTime.fromFormat(value, fromFormat).toLocal().toFormat(format);
		} catch (error) {
			return '';
		}
	}


</script>

<td onclick={onclick_cell} class:has-text-danger={DC001}>
	{#if DC001}
		<span class="icon-text" title="Incorrect date">
			<span class="icon">
				<i class="fas fa-exclamation-triangle"></i>
			</span>
			<span>{value}</span>
		</span>
	{:else}
		{value_formated}
	{/if}
</td>
