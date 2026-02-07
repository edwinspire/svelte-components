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

	let dt = $derived.by(() => {
		if (!value) return null;

		if (value instanceof Date) {
			return DateTime.fromJSDate(value);
		}

		// Try ISO first as it is standard
		let d = DateTime.fromISO(value);
		// If ISO fails and we have a specific format, try that
		if (!d.isValid && fromFormat) {
			d = DateTime.fromFormat(value, fromFormat);
		}
		return d;
	});

	let isNotToday = $derived(
		HighlightIsntToday &&
			(!dt || !dt.isValid || dt.toFormat('yyyy-MM-dd') !== DateTime.local().toFormat('yyyy-MM-dd'))
	);

	let formattedValue = $derived(dt && dt.isValid ? dt.toLocal().toFormat(format) : '');
</script>

<td onclick={onclick_cell} class:has-text-danger={isNotToday} class={css_cell}>
	{#if isNotToday}
		<span class="icon-text" title="Incorrect date">
			<span class="icon">
				<i class="fas fa-exclamation-triangle"></i>
			</span>
			<span>{value || ''}</span>
		</span>
	{:else}
		{formattedValue}
	{/if}
</td>
