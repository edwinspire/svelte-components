<script>
	import { onMount } from 'svelte';

	let {
		options = $bindable([
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' }
		]),
		label = $bindable('Select'),
		selectedValue = $bindable(null),
		classLabel = $bindable('is-small'),
		classInput = $bindable('is-small'),
		placeholder = $bindable('Type to see options'),
		classIcon = $bindable('fa-solid fa-keyboard'),
		classOnSucess = $bindable('is-success'),
		classOnError = $bindable('is-danger'),
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
		//	console.log(filteredOptions);
		selectedValue = null;
		showDropdown = true;
	}

	function handleClick(option) {
		inputValue = option.name;
		selectedValue = option.value;
		showDropdown = false;
		//	console.log('option', option);
		onselect($state.snapshot(option));
	}

	function handleFocus() {
		if (inputValue) {
			filteredOptions = options.filter((option) =>
				option.name.toLowerCase().includes(inputValue.toLowerCase())
			);
		} else {
			filteredOptions = [];
		}

		// showDropdown = true;
	}

	let selectedValueIsValid = $derived(
		options.find((option) => option.value.includes(selectedValue))
	);

	$effect(() => {
		if (selectedValue != null) {
			if (!selectedValueIsValid) {
				inputValue = '';
			}
		}
	});

	onMount(() => {
		inputValue = options.find((option) => option.value === selectedValue)?.name;
	});
</script>

<div class="field has-addons">
	{#if label && label.length > 0}
		<p class="control">
			<span class="button {classLabel} is-static">
				<span class="icon">
					<i class={classIcon}></i>
				</span>
				<span>{label}</span>
			</span>
		</p>
	{/if}
	<div class="control">
		<input
			class="input {classInput} is-outlined"
			type="text"
			bind:value={inputValue}
			oninput={handleInput}
			onfocus={handleFocus}
			{placeholder}
		/>
		<input type="hidden" bind:value={selectedValue} />
		{#if !selectedValueIsValid}
			<p class="help {classOnError} is-small">
				The selected value <strong>{inputValue}</strong> is not valid.
			</p>
		{/if}
		{#if showDropdown && filteredOptions.length > 0}
			<div class="dropdown is-active">
				<div class="dropdown-menu" role="menu">
					<div class="dropdown-content">
						{#each filteredOptions as option}
							<!-- svelte-ignore a11y_invalid_attribute -->
							<a href="#" class="dropdown-item ajust-item" onclick={() => handleClick(option)}>
								{option.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
	<p class="control">
		<span class="button {classLabel} {selectedValueIsValid ? classOnSucess : classOnError}">
			<span class="icon">
				{#if selectedValueIsValid}
					<i class="fa-solid fa-check"></i>
				{:else}
					<i class="fa-solid fa-triangle-exclamation"></i>
				{/if}
			</span>
		</span>
	</p>
</div>

<style>
	.dropdown-content {
		max-height: 200px;
		overflow-y: auto;
	}
	.ajust-item {
		padding: 0.1rem 0.1rem 0.1rem 1rem;
		font-size: 0.75rem;
	}
</style>
