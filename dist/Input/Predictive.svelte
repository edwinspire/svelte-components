<script>
	import { onMount } from 'svelte';

	let {
		options = [
			{ name: 'Manzana', value: '1' },
			{ name: 'Durazno', value: '2' },
			{ name: 'Pera', value: 'pera' },
			{ name: 'Kiwi', value: '34' }
		],
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
