<script>
	import { onMount } from 'svelte';

	let {
		options = $bindable([
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' }
		]),
		label = $bindable(''),
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
		console.log(filteredOptions);
		selectedValue = null;
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

	$inspect(selectedValue).with((type) => {
		if (type === 'update') {
			if (!selectedValueIsValid) {
				inputValue = '';
			}
		}
	});

	onMount(() => {
		inputValue = options.find((option) => option.value === selectedValue)?.name;
	});
</script>

<div class="field is-horizontal">
	{#if label && label.length > 0}
		<div class="field-label {classLabel}">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label">{label}</label>
		</div>
	{/if}
	<div class="field-body">
		<div class="field">

			<div class="control has-icons-left">
				<input
					class="input {classInput} {selectedValueIsValid ? classOnSucess : classOnError}"
					type="text"
					bind:value={inputValue}
					oninput={handleInput}
					onfocus={handleFocus}
					{placeholder}
				/>
				<span class="icon is-small is-left">
					<i class={classIcon}></i>
				</span>
			</div>

			{#if !selectedValueIsValid}
				<p class="help {classOnError} is-small">
					The selected value {selectedValue} is not valid.
				</p>
			{/if}

			<input type="hidden" bind:value={selectedValue} />

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

<style>
	.dropdown-content {
		max-height: 200px;
		overflow-y: auto;
	}
</style>
