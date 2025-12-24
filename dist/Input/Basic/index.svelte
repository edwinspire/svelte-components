<script>
	import FileUpload from '../../FileUpload/index.svelte';
	import { DateTime } from 'luxon';

	let {
		placeholder = $bindable(),
		type = $bindable('text'),
		label = $bindable(),
		value = $bindable(),
		sizeClass = $bindable('is-small'),
		labelClass = $bindable(''),
		min = $bindable(),
		max = $bindable(),
		step = $bindable(),
		isExpanded = $bindable(true),
		accept = $bindable('.json'),
		url = 'http://localhost:3000/upload',
		multiple = false,
		onselect = () => {},
		onupload = () => {},
		onchange = () => {},
		showUploadButton = $bindable(true),
		pattern = $bindable(),
		required = $bindable(false)
	} = $props();

	let localDateTime = $derived.by(() => {
		return type == 'datetime-local'
			? DateTime.fromISO(value, { zone: 'utc' }).toLocal().toFormat("yyyy-MM-dd'T'HH:mm")
			: '';
	});

	function localDateTimeToUTC(localDateTime) {
		return DateTime.fromFormat(localDateTime, "yyyy-MM-dd'T'HH:mm").toUTC().toISO();
	}

	let dateFormated = $derived.by(() => {
		return DateTime.fromISO(value, { zone: 'utc' }).toFormat('yyyy-MM-dd');
	});
</script>

{#if type == 'file'}
	<FileUpload
		bind:label
		bind:accept
		bind:url
		bind:multiple
		{onchange}
		{onselect}
		{onupload}
		bind:showUploadButton
	></FileUpload>
{:else}
	<div class="field has-addons">
		{#if label != null}
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-static {sizeClass} "> {label} </a>
			</p>
		{/if}
		<p class="control {isExpanded ? 'is-expanded' : ''}">
			{#if type == 'checkbox'}
				<!-- svelte-ignore a11y_missing_attribute -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					class="button {sizeClass} {value ? 'is-success' : ''}"
					{onchange}
					onclick={() => {
						value = !value;
					}}
					><span class="icon-text">
						<span class="icon {sizeClass}">
							{#if value}
								<i class="fa-regular fa-square-check"></i>
							{:else}
								<i class="fa-regular fa-square"></i>
							{/if}
						</span>
					</span></a
				>
			{:else if type == 'datetime-local'}
				<input
					{pattern}
					{required}
					class="input {sizeClass}"
					type="datetime-local"
					{placeholder}
					value={localDateTime}
					onchange={(e) => {
						//console.log(e, localDateTime);
						value = localDateTimeToUTC(e.target.value);
						console.log(value);
					}}
				/>
			{:else if type == 'date'}
				<input
					{pattern}
					{required}
					class="input {sizeClass}"
					type="date"
					{placeholder}
					value={dateFormated}
					onchange={(e) => {
						//	console.log(e, dateFormated);
						value = localDateTimeToUTC(e.target.value);
						//	console.log(value);
					}}
				/>
			{:else if type == 'number'}
				<input
					{pattern}
					{required}
					class="input {sizeClass}"
					type="number"
					{placeholder}
					bind:value
					{max}
					{min}
					{step}
					{onchange}
				/>
			{:else if type == 'boolean'}
				<!-- svelte-ignore a11y_missing_attribute -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					class="button {sizeClass} {value ? 'is-success' : 'is-danger'}"
					onclick={() => {
						value = !value;
					}}>{value}</a
				>
			{:else}
				<input
					{pattern}
					{required}
					class="input {sizeClass}"
					{type}
					{placeholder}
					bind:value
					{onchange}
				/>
			{/if}
		</p>
	</div>
{/if}
