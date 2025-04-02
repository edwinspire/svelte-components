<script>
	import FileUpload from '../../FileUpload/index.svelte';

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

		accept = $bindable('.json'),
		url = 'http://localhost:3000/upload',
		multiple = false,
		onselect = () => {},
		onupload = () => {},
		showUploadButton = $bindable(true)
	} = $props();
</script>

{#if type == 'file'}
	<FileUpload
		bind:label
		bind:accept
		bind:url
		bind:multiple
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
		<p class="control">
			{#if type == 'checkbox'}
				<!-- svelte-ignore a11y_missing_attribute -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					class="button {sizeClass}"
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
				<input class="input {sizeClass}" type="datetime-local" {placeholder} {value} />
			{:else if type == 'datetime'}
				<input class="input {sizeClass}" type="datetime-local" {placeholder} {value} />
			{:else if type == 'number'}
				<input class="input {sizeClass}" type="number" {placeholder} {value} {max} {min} {step} />
			{:else}
				<input class="input {sizeClass}" type="text" {placeholder} {value} />
			{/if}
		</p>
	</div>
{/if}
