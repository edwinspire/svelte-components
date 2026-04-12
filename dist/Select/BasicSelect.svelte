<script>
	/**
	 * Represents the parameters supported by the BasicSelect component.
	 * 
	 * @typedef {Object} BasicSelectProps
	 * @property {string|null} [label=''] - The static text label rendered as an addon before the select dropdown.
	 * @property {boolean} [isExpanded=false] - Whether the control should expand to fill the available width.
	 * @property {string|number|any} [option=''] - The currently selected option value. Bound bidirectionally.
	 * @property {Array<{id: string|number, value: string, enabled?: boolean}>} [options=[{ id: 'TEST', value: 'TEST', enabled: true }]] - An array of objects representing the select options.
	 * @property {string} [css_class=' is-small '] - CSS class to apply for styling, specifically related to sizing in Bulma (e.g., 'is-small', 'is-normal').
	 * @property {function({value: any}): void} [onselect] - Callback triggered when the user selection changes, receives the selected value.
	 */

	/** @type {BasicSelectProps & Record<string, any>} */
	let {
		label = $bindable(''),
		isExpanded = $bindable(false),
		option = $bindable(''),
		options = $bindable([{ id: 'TEST', value: `TEST`, enabled: true }]),
		css_class = $bindable(' is-small '),
		onselect = (s) => {
			//	console.log('onselect not implemented');
		}
	} = $props();

	function handleClick() {
		onselect({ value: option });
	}
</script>

<div class="field has-addons">
	{#if label && label.length > 0}
		<p class="control ">
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="button is-static {css_class}"> {label} </a>
		</p>
	{/if}

	<p class="control {isExpanded ? 'is-expanded' : ''}">
		<span class="select {css_class}">
			<select bind:value={option} onchange={handleClick}>
				{#if options && Array.isArray(options)}
					{#each options as h}
						<option value={h.id}>
							{h.value}
						</option>
					{/each}
				{/if}
			</select>
		</span>
	</p>
</div>
