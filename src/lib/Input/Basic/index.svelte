<script>
	import FileUpload from '$lib/FileUpload/index.svelte';
	import { DateTime } from 'luxon';

	let {
		type = $bindable('text'),
		label = $bindable(),
		value = $bindable(),
		sizeClass = $bindable('is-small'),
		labelClass = $bindable(''),
		isExpanded = $bindable(true),
		accept = $bindable('.json'),
		url = 'http://localhost:3000/upload',
		multiple = false,
		onselect = () => {},
		onupload = () => {},
		onchange = () => {},
		showUploadButton = $bindable(true),
		...rest
	} = $props();

	// Generate a unique ID for accessibility
	const id = rest.id || `input-${Math.random().toString(36).substring(2, 9)}`;

	// Common classes for input elements
	let inputClass = $derived(`input ${sizeClass} ${rest.class || ''}`);

	let localDateTime = $derived.by(() => {
		if (!value) return '';
		return type == 'datetime-local'
			? DateTime.fromISO(value, { zone: 'utc' }).toLocal().toFormat("yyyy-MM-dd'T'HH:mm")
			: '';
	});

	let dateFormated = $derived.by(() => {
		if (!value) return '';
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
				<label class="button is-static {sizeClass} {labelClass}" for={id}> {label} </label>
			</p>
		{/if}
		<p class="control {isExpanded ? 'is-expanded' : ''}">
			{#if type == 'checkbox'}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					class="button {sizeClass} {value ? 'is-success' : ''}"
					onclick={() => {
						value = !value;
						onchange(value);
					}}
					{...rest}
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
					{id}
					class={inputClass}
					type="datetime-local"
					{...rest}
					value={localDateTime}
					onchange={(e) => {
						if (!e.target.value) {
							value = null;
						} else {
							value = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'HH:mm").toUTC().toISO();
						}
						onchange(e);
					}}
				/>
			{:else if type == 'date'}
				<input
					{id}
					class={inputClass}
					type="date"
					{...rest}
					value={dateFormated}
					onchange={(e) => {
						if (!e.target.value) {
							value = null;
						} else {
							value = DateTime.fromFormat(e.target.value, 'yyyy-MM-dd', { zone: 'utc' }).toISO();
						}
						onchange(e);
					}}
				/>
			{:else if type == 'number'}
				<input {id} class={inputClass} type="number" bind:value {...rest} {onchange} />
			{:else if type == 'boolean'}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					class="button {sizeClass} {value ? 'is-success' : 'is-danger'}"
					onclick={() => {
						value = !value;
						onchange(value);
					}}
					{...rest}>{value}</a
				>
			{:else}
				<input {id} class={inputClass} {type} bind:value {...rest} {onchange} />
			{/if}
		</p>
	</div>
{/if}
