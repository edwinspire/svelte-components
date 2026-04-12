<script>
	import FileUpload from '../../FileUpload/index.svelte';
	import { DateTime } from 'luxon';

	/**
	 * Represents the parameters supported by the basic Input component.
	 * 
	 * @typedef {Object} InputProps
	 * @property {string} [placeholder=''] - Text that appears in the input element when it has no value set.
	 * @property {string} [type='text'] - The type of input to render ('text', 'number', 'date', 'datetime-local', 'file', 'checkbox', 'boolean').
	 * @property {string|null} [label] - The text label to display adjacent to the input field.
	 * @property {any} [value] - The current value of the input. Can be a string, number, or boolean depending on the type.
	 * @property {string} [sizeClass='is-small'] - Bulma CSS class for input sizing (e.g., 'is-small', 'is-normal', 'is-large').
	 * @property {string} [labelClass=''] - Additional CSS classes applied exclusively to the label element.
	 * @property {number|string} [min] - Minimum value allowed, used primarily for number or date types.
	 * @property {number|string} [max] - Maximum value allowed.
	 * @property {number|string} [step] - Step value for numeric or date inputs.
	 * @property {boolean} [isExpanded=true] - Whether the control should span the full width of its container (adds 'is-expanded' class).
	 * @property {string} [accept='.json'] - File types accepted when type is 'file' (e.g., 'image/png', '.csv').
	 * @property {string} [url='http://localhost:3000/upload'] - The endpoint URL used when uploading files.
	 * @property {boolean} [multiple=false] - Whether multiple files can be selected if type is 'file'.
	 * @property {function} [onselect=() => {}] - Callback triggered when files are selected (for type 'file').
	 * @property {function} [onupload=() => {}] - Callback triggered when files are uploaded successfully (for type 'file').
	 * @property {function} [onchange=() => {}] - Standard change event callback whenever the input value changes.
	 * @property {boolean} [showUploadButton=true] - Controls visibility of the upload button in the FileUpload component.
	 * @property {string} [pattern] - A regular expression that the input's value must match.
	 * @property {boolean} [required=false] - Specifies if the input is mandatory.
	 */

	/** @type {InputProps & Record<string, any>} */
	let {
		placeholder = $bindable(''),
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
		required = $bindable(false),
		...rest
	} = $props();


	// Generate a stable unique ID for accessibility if not provided
	const id = rest.id || `input-${Math.random().toString(36).substring(2, 9)}`;

	// Common classes for input elements, merging sizeClass and any user-provided class
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
					onclick={(e) => {
						value = !value;
						onchange(value);
						if (rest.onclick) rest.onclick(e);
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
					{placeholder}
					{required}
					{...rest}
					value={localDateTime}
					onchange={(e) => {
						if (!e.target.value) {
							value = null;
						} else {
							value = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'HH:mm").toUTC().toISO();
						}
						onchange(e);
						if (rest.onchange) rest.onchange(e);
					}}
				/>
			{:else if type == 'date'}
				<input
					{id}
					class={inputClass}
					type="date"
					{placeholder}
					{required}
					{...rest}
					value={dateFormated}
					onchange={(e) => {
						if (!e.target.value) {
							value = null;
						} else {
							value = DateTime.fromFormat(e.target.value, 'yyyy-MM-dd', { zone: 'utc' }).toISO();
						}
						onchange(e);
						if (rest.onchange) rest.onchange(e);
					}}
				/>
			{:else if type == 'number'}
				<input
					{id}
					class={inputClass}
					type="number"
					bind:value
					{min}
					{max}
					{step}
					{placeholder}
					{required}
					{...rest}
					{onchange}
				/>
			{:else if type == 'boolean'}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					class="button {sizeClass} {value ? 'is-success' : 'is-danger'}"
					onclick={(e) => {
						value = !value;
						onchange(value);
						if (rest.onclick) rest.onclick(e);
					}}
					{...rest}>{value}</a
				>
			{:else}
				<input
					{id}
					class={inputClass}
					{type}
					bind:value
					{placeholder}
					{required}
					{pattern}
					{...rest}
					{onchange}
				/>
			{/if}
		</p>
	</div>
{/if}
