<script>
	let {
		options = $bindable([]),
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

	/* ---------- State ---------- */
	let inputValue = $state('');
	let showDropdown = $state(false);
	let filteredOptions = $state([]);

	/* ---------- Derived ---------- */
	const placeholderInternal = $derived(() =>
		placeholder?.length ? placeholder : 'Type to see options'
	);

	const classIconInternal = $derived(() =>
		classIcon?.length
			? classIcon
			: freeTyping
				? 'fa-regular fa-keyboard'
				: 'fa-solid fa-angle-down'
	);

	const selectedValueIsValid = $derived(() =>
		freeTyping
			? true
			: options.some((o) => o.value === selectedValue)
	);

	/* ---------- Sync: selectedValue → inputValue ---------- */
	$effect(() => {
		if (freeTyping) {
			inputValue.set(selectedValue ?? '');
			return;
		}

		const match = options.find((o) => o.value === selectedValue);
		inputValue.set(match?.name ?? '');
	});

	/* ---------- Filtering ---------- */
	function filterOptions(text) {
		if (!text) return [];
		return options.filter((o) =>
			o.name.toLowerCase().includes(text.toLowerCase())
		);
	}

	function handleInput(event) {
		const value = event.target.value;
		inputValue.set(value);
		filteredOptions.set(filterOptions(value));
		showDropdown.set(true);
		selectedValue.set(null);
	}

	function handleFocus() {
		filteredOptions.set(filterOptions(inputValue()));
		showDropdown.set(true);
	}

	function handleSelect(option) {
		inputValue.set(option.name);
		selectedValue.set(option.value);
		showDropdown.set(false);
		onselect(option);
	}

	function blurHandler() {
		if (!freeTyping) return;

		selectedValue.set(inputValue());
		onselect({ name: 'freeTyping', value: inputValue() });
		showDropdown.set(false);
	}
</script>

<div class="field has-addons">
	{#if label}
		<p class="control">
			<span class="button {classLabel} is-static">{label}</span>
		</p>
	{/if}

	<div class="control is-expanded">
		<input
			class="input {classInput}"
			type="text"
			bind:value={inputValue}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={blurHandler}
			placeholder={placeholderInternal}
		/>

		{#if showDropdown && filteredOptions.length}
			<div class="menu_items">
				<div class="box">
					<ul>
						{#each filteredOptions as option}
							<li>
								<button
									type="button"
									class="is-size-7"
									onclick={() => handleSelect(option)}
								>
									{option.name}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>

	<p class="control">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			type="button"
			class="button is-outlined {classLabel} {selectedValueIsValid ? classOnSucess : classOnError}"
			onclick={() => showDropdown.set(!showDropdown())}
		>
			<span class="icon">
				<i class={classIconInternal}></i>
			</span>
		</button>
	</p>
</div>
