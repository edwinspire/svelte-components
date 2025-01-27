<script>
	let {
		options = $bindable([
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' }
		]),
		label = $bindable(''),
		selectedValue = $bindable(''),
		classLabel = $bindable('is-normal'),
		classInput = $bindable(''),
		placeholder = $bindable('Type to see options'),
		onselect = () => {}
	} = $props();

	let filteredOptions = $state(options);
	let showDropdown = $state(false);
	let inputValue = $state('');


	function handleInput(event) {
		inputValue = event.target.value;
		filteredOptions = options.filter((option) =>
			option.name.toLowerCase().includes(inputValue.toLowerCase())
		);
		showDropdown = true;
	}

	function handleClick(option) {
		inputValue = option.name;
		selectedValue = option.value;
		showDropdown = false;
	//	console.log('option', option);
		onselect(option);
	}

	function handleFocus() {
		filteredOptions = options.filter((option) =>
			option.name.toLowerCase().includes(inputValue.toLowerCase())
		);
		// showDropdown = true;
	}
</script>

<div class="field is-horizontal">
	<div class="field-label {classLabel}">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">{label}</label>
	</div>
	<div class="field-body">
		<div class="field is-narrow">
			<div class="control">
				<div class="control">
					<input
						class="input {classInput}"
						type="text"
						bind:value={inputValue}
						oninput={handleInput}
						onfocus={handleFocus}
						{placeholder}
					/>
					<input type="hidden" bind:value={selectedValue} />
				</div>
				{#if showDropdown && filteredOptions.length > 0}
					<div class="dropdown is-active">
						<div class="dropdown-menu" role="menu">
							<div class="dropdown-content">
								{#each filteredOptions as option}
									<!-- svelte-ignore a11y_invalid_attribute -->
									<a href="#" class="dropdown-item" onclick={() => handleClick(option)}>
										{option.name}
									</a>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.dropdown-content {
		max-height: 200px;
		overflow-y: auto;
	}
</style>
