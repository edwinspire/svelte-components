<!-- App.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let options = [
		{ key: 'Manzana', value: '1' },
		{ key: 'Durazno', value: '2' },
		{ key: 'Limón', value: '3' },
		{ key: 'Mandarina', value: '4' },
		{ key: 'Naranja', value: '5' },
		{ key: 'Toronja', value: '6' },
		{ key: 'Fresa', value: '7' },
		{ key: 'Plátano', value: '8' },
		{ key: 'kiwi', value: '9' },
		{ key: 'Maracuyá', value: '10' },
		{ key: 'Chirimoya', value: '11' },
		{ key: 'Babaco', value: '12' },
		{ key: 'Aguacate', value: '13' },
		{ key: 'Pera', value: '14' },
		{ key: 'Mispero', value: '15' },
		{ key: 'Guaba', value: '16' },
		{ key: 'Guanabana', value: '17' },
		{ key: 'Mora', value: '18' },
		{ key: 'Taxo', value: '19' },
		{ key: 'Tamarindo', value: '20' }
	];

	let filteredOptions = options;
	let showDropdown = false;
	let inputValue = '';
	export let label = '';

	export let selectedValue = '';
	export let classLabel = 'is-normal';
	export let classInput = '';
	export let placeholder = 'Type to see options';

	function handleInput(event) {
		inputValue = event.target.value;
		filteredOptions = options.filter((option) =>
			option.key.toLowerCase().includes(inputValue.toLowerCase())
		);
		showDropdown = true;
	}

	function handleClick(option) {
		inputValue = option.key;
		selectedValue = option.value;
		showDropdown = false;
		console.log('option', option);
		dispatch('select', option);
	}

	function handleFocus() {
		filteredOptions = options.filter((option) =>
			option.key.toLowerCase().includes(inputValue.toLowerCase())
		);
		// showDropdown = true;
	}
</script>

<div class="field is-horizontal">
	<div class="field-label {classLabel}">
		<!-- svelte-ignore a11y-label-has-associated-control -->
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
						on:input={handleInput}
						on:focus={handleFocus}
						{placeholder}
					/>
					<input type="hidden" bind:value={selectedValue} />
				</div>
				{#if showDropdown && filteredOptions.length > 0}
					<div class="dropdown is-active">
						<div class="dropdown-menu" role="menu">
							<div class="dropdown-content">
								{#each filteredOptions as option}
									<!-- svelte-ignore a11y-invalid-attribute -->
									<a href="#" class="dropdown-item" on:click={() => handleClick(option)}>
										{option.key}
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
