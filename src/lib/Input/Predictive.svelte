<script>
	import { onMount } from 'svelte';

	let {
		options = $bindable([
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' },
			{ name: 'Pera', value: 'pera' },
			{ name: 'Kiwi', value: '34' }
		]),
		label = $bindable('SELECT'),
		selectedValue = $bindable(null),
		classLabel = $bindable('is-small'),
		classInput = $bindable('is-small'),
		placeholder = $bindable(''),
		classIcon = $bindable(''),
		classOnSucess = $bindable('is-success'),
		classOnError = $bindable('is-danger fa-beat-fade'),
		freeTyping = $bindable(false),
		onselect = () => {}
	} = $props();

	let old_selectedValue;
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

	$effect(() => {
		//if (selectedValue != null) {
		//console.log('selectedValue', selectedValue, inputValue);
		//setinputValue();
		checkUpdateSelectedValue();
		//}
	});

	function handleInput(event) {
		inputValue = event.target.value;
		filteredOptions = options.filter((option) =>
			option.name.toLowerCase().includes(inputValue.toLowerCase())
		);
		//	console.log(filteredOptions);
		//	console.log('handleInput >> ', inputValue);
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
			selectedValue = inputValue;
			//console.log('blurHandler', inputValue);
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

	function checkUpdateSelectedValue() {
		if (old_selectedValue != selectedValue) {
			//	console.log('UPDATED setinputValue Compare >> ', old_selectedValue, selectedValue, inputValue);
			old_selectedValue = selectedValue;

			if (freeTyping) {
				inputValue = selectedValue;
			} else {
				let new_inputValue = options.find((option) => option.value == selectedValue)?.name;

				if (new_inputValue) {
					inputValue = new_inputValue;
				} else {
					selectedValue = null;
				}
			}
		}
	}

	onMount(() => {
		//setinputValue();
		checkUpdateSelectedValue();
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

	
		{#if showDropdown && filteredOptions.length > 0}
		<div class="menu_items">
			<div class="box">
				<ul>
					
					{#each filteredOptions as option}
						<!-- svelte-ignore a11y_invalid_attribute -->
						<li>
							<a class="is-size-7" href="#" onclick={() => handleClick(option)}>
								{option.name}
							</a>
						</li>
					{/each}
					
				</ul>
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

	.menu_items {
		position: absolute; /* Hace que el mensaje flote */
		top: 100%; /* Coloca el mensaje justo debajo del input */
		left: 0;
		z-index: 5;
	}
</style>
