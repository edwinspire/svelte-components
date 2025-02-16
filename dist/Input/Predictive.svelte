<script>
	import { onMount } from 'svelte';

	let {
		options = $bindable([
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' }
		]),
		label = $bindable('SELECT'),
		selectedValue = $bindable(null),
		classLabel = $bindable('is-small'),
		classInput = $bindable('is-small'),
		placeholder = $bindable(''),
		classIcon = $bindable(''),
		classOnSucess = $bindable('is-success'),
		classOnError = $bindable('is-danger'),
		freeTyping = $bindable(false),
		onselect = () => {}
	} = $props();

	let filteredOptions = $state(options);
	let showDropdown = $state(false);
	let inputValue = $state('');

	let placeholderInternal = $derived(
		placeholder && placeholder.length > 0 ? placeholder : 'Type to see options'
	);

	let classIconInternal = $derived(
		classIcon && classIcon.length > 0
			? classIcon
			: freeTyping
				? 'fa-regular fa-keyboard'
				: 'fa-solid fa-angle-down'
	);

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
		if (!freeTyping) {
			onselect($state.snapshot(option));
		} else {
			blurHandler();
		}
	}

	function blurHandler() {
		if (freeTyping) {
			onselect($state.snapshot({ name: 'freeTyping', value: inputValue }));
		}
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
		freeTyping ? true : options.find((option) => option.value.includes(selectedValue))
	);

	$effect(() => {
		if (selectedValue != null) {
			if (!selectedValueIsValid) {
				inputValue = '';
			} else {
				setinputValue();
			}
		}
	});

	function setinputValue() {
		inputValue = options.find((option) => option.value === selectedValue)?.name;
	}

	onMount(() => {
		setinputValue();
	});
</script>

<div class="field has-addons">
	{#if label && label.length > 0}
		<p class="control">
			<span class="button {classLabel} is-static">
				<span>{label}</span>
			</span>
		</p>
	{/if}
	<div class="control is-expanded">
		<input
			class="input {classInput} is-outlined"
			type="text"
			bind:value={inputValue}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={blurHandler}
			placeholder={placeholderInternal}
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
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class="button is-outlined {classLabel} {selectedValueIsValid ? classOnSucess : classOnError}"
			onclick={() => {
				showDropdown = !showDropdown;
			}}
		>
			<span class="icon">
				<i class={classIconInternal}></i>
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
