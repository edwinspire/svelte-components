<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {Object} Option
	 * @property {string} name - El texto visible de la opción en el menú.
	 * @property {any} value - El valor interno que se asignará al seleccionar la opción.
	 */

	let {
		/** @type {Option[]} options - Lista de opciones disponibles para el autocompletado. */
		options = [
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' },
			{ name: 'Pera', value: 'pera' },
			{ name: 'Kiwi', value: '34' }
		],
		/** @type {string} label - Etiqueta a mostrar junto al campo de entrada. */
		label = $bindable('SELECT'),
		/** @type {any} selectedValue - Valor actualmente seleccionado. Es bindable. */
		selectedValue = $bindable(null),
		/** @type {string} classLabel - Clases CSS adicionales para la etiqueta. */
		classLabel = $bindable('is-small'),
		/** @type {string} classInput - Clases CSS adicionales para el campo de texto. */
		classInput = $bindable('is-small'),
		/** @type {string} placeholder - Texto de marcador de posición para el campo de texto. */
		placeholder = $bindable(''),
		/** @type {string} classIcon - Clases CSS para el icono del botón desplegable. Si está vacío, se calcula automáticamente. */
		classIcon = $bindable(''),
		/** @type {string} classOnSucess - Clase CSS a aplicar cuando hay un valor válido seleccionado. */
		classOnSucess = $bindable('is-success'),
		/** @type {string} classOnError - Clase CSS a aplicar cuando no hay un valor válido (a menos que freeTyping sea true). */
		classOnError = $bindable('is-danger fa-beat-fade'),
		/** @type {boolean} freeTyping - Permite ingresar texto libre que no esté en la lista de opciones. */
		freeTyping = $bindable(false),
		/** @type {function(Option): void} onselect - Función callback que se ejecuta al seleccionar una opción. */
		onselect = () => {}
	} = $props();

	let old_selectedValue = $state();
	let showDropdown = $state(false);
	let inputValue = $state('');
	let isTyping = $state(false);

	let filteredOptions = $derived(
		inputValue
			? options.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()))
			: options
	);

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
		if (!options) return;
		checkUpdateSelectedValue();
	});

	function handleInput(event) {
		isTyping = true;
		inputValue = event.target.value;
		selectedValue = null;
		showDropdown = true;
	}

	function handleClick(option) {
		isTyping = false;
		inputValue = option.name;
		selectedValue = option.value;
		showDropdown = false;

		if (!freeTyping) {
			onselect($state.snapshot(option));
		} else {
			blurHandler();
		}
	}

	function blurHandler() {
		setTimeout(() => {
			showDropdown = false;
			isTyping = false;
			if (freeTyping) {
				selectedValue = inputValue;

				onselect($state.snapshot({ name: 'freeTyping', value: inputValue }));
			}
			checkUpdateSelectedValue();
		}, 200);
	}

	function handleFocusOut(event) {
		if (event.currentTarget.contains(event.relatedTarget)) {
			return;
		}
		blurHandler();
	}

	function handleFocus() {
		showDropdown = true;
	}

	let selectedValueIsValid = $derived(
		freeTyping ? true : options.some((option) => option.value === selectedValue)
	);

	function checkUpdateSelectedValue() {
		if (old_selectedValue !== selectedValue) {
			old_selectedValue = selectedValue;

			if (!isTyping) {
				if (freeTyping) {
					inputValue = selectedValue ?? '';
				} else {
					const found = options.find((opt) => opt.value === selectedValue);
					inputValue = found ? found.name : '';
				}
			}
		}
	}

	onMount(() => {
		if (!selectedValue) {
			selectedValue = '';
		}
	});
</script>

<div class="field has-addons">
	{#if label && label.length > 0}
		<p class="control" title={selectedValue}>
			<span class="button {classLabel} is-static">
				<span>{label}</span>
			</span>
		</p>
	{/if}
	<div class="control is-expanded" onfocusout={handleFocusOut}>
		<input
			class="input {classInput} is-outlined"
			type="text"
			bind:value={inputValue}
			oninput={handleInput}
			onfocus={handleFocus}
			placeholder={placeholderInternal}
		/>

		{#if showDropdown && filteredOptions.length > 0}
			<div class="menu_items">
				<div class="box">
					<ul>
						{#each filteredOptions as option}
							<!-- svelte-ignore a11y_invalid_attribute -->
							<li>
								<a
									class="is-size-7"
									href={'#'}
									onclick={(e) => {
										e.preventDefault();
										handleClick(option);
									}}
								>
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
		<button
			class="button is-outlined {classLabel} {selectedValueIsValid ? classOnSucess : classOnError}"
			aria-label="Toggle dropdown"
			onclick={() => {
				showDropdown = !showDropdown;
			}}
		>
			<span class="icon">
				<i class={classIconInternal}></i>
			</span>
		</button>
	</p>
</div>

<style>
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
