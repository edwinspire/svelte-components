<!-- App.svelte -->
<script>
	//	import { createEventDispatcher } from 'svelte';
	//	const dispatch = createEventDispatcher();
	/*
	export let options = [
		{ name: 'Manzana', value: '1' },
		{ name: 'Durazno', value: '2' },
		{ name: 'Limón', value: '3' },
		{ name: 'Mandarina', value: '4' },
		{ name: 'Naranja', value: '5' },
		{ name: 'Toronja', value: '6' },
		{ name: 'Fresa', value: '7' },
		{ name: 'Plátano', value: '8' },
		{ name: 'kiwi', value: '9' },
		{ name: 'Maracuyá', value: '10' },
		{ name: 'Chirimoya', value: '11' },
		{ name: 'Babaco', value: '12' },
		{ name: 'Aguacate', value: '13' },
		{ name: 'Pera', value: '14' },
		{ name: 'Mispero', value: '15' },
		{ name: 'Guaba', value: '16' },
		{ name: 'Guanabana', value: '17' },
		{ name: 'Mora', value: '18' },
		{ name: 'Taxo', value: '19' },
		{ name: 'Tamarindo', value: '20' }
	];
*/
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

	//	export let label = '';
	/*
	export let selectedValue = '';
	export let classLabel = 'is-normal';
	export let classInput = '';
	export let placeholder = 'Type to see options';
*/

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
