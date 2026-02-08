<script>
	import { onMount, tick } from 'svelte';
	import { Level } from '../../index.js';
	import FileUpload from '../../FileUpload/index.svelte';

	let { data = $bindable([]), onchange = () => {}, enableFileType = false } = $props();
	let fieldTypes = [
		{
			id: 1,
			text: `Text`
		},
		{
			id: 2,
			text: `Text Multiline`
		},
		{
			id: 3,
			text: `File`
		}
	];

	let fieldTypesVisible = $derived.by(() => {
		return enableFileType ? fieldTypes : fieldTypes.filter((p) => p.id !== 3);
	});

	function generateId() {
		return Math.random().toString(36).substr(2, 9);
	}

	function ensureIds() {
		if (Array.isArray(data)) {
			let changed = false;
			data = data.map((item) => {
				if (!item._id) {
					changed = true;
					return { ...item, _id: generateId() };
				}
				return item;
			});
		}
	}

	function addRowEmpty() {
		if (!data || !Array.isArray(data)) {
			data = [];
		}

		// Prevent adding new row if any existing key is empty
		if (data.some((p) => !p.key || p.key.trim() === '')) {
			const emptyRowIndex = data.findIndex((p) => !p.key || p.key.trim() === '');
			// Optional: functionality to focus the empty input could go here
			// For now, just stop.
			return;
		}

		data.push({ enabled: true, key: '', value: '', _id: generateId(), type: 1 });

		// Trigger reactivity
		data = [...data];
		onchange(data);
	}

	// Remove row
	function removeRow(index) {
		if (!data || !Array.isArray(data)) return;

		if (confirm('Are you sure you want to delete this parameter?')) {
			data = data.filter((_, i) => i !== index);
			onchange(data);
		}
	}

	let keyInputs = $state([]);

	async function handleKeydownLast(e, index) {
		if (e.key === 'Tab' && !e.shiftKey && index === data.length - 1) {
			const prevLen = data.length;
			addRowEmpty();
			// If a row was added (length increased), focus the new input
			if (data.length > prevLen) {
				e.preventDefault();
				await tick();
				// The new input is at the end
				const newInput = keyInputs[data.length - 1];
				if (newInput) newInput.focus();
			}
		}
	}

	// Effect to notify parent of changes and ensure data integrity
	$effect(() => {
		if (!data || !Array.isArray(data)) {
			// If data is not an array (e.g. initialized as {} by parent), fix it.
			data = [];
		} else {
			// Ensure all items have IDs for the keyed loop
			let needsUpdate = false;
			for (let item of data) {
				if (!item._id) {
					item._id = generateId();
					needsUpdate = true;
				}
				if (!item.type) {
					item.type = 1; // Default to Text
					needsUpdate = true;
				}
			}
			if (needsUpdate) {
				data = [...data]; // Trigger update if we added IDs/types
			}
		}
	});

	onMount(() => {
		// allow parent to set initial data, but validation happens in effect
	});
</script>

{#snippet add_item()}
	<div class="field has-addons">
		<p class="control">
			<button class="button is-small" onclick={addRowEmpty}>
				<span class="icon"><i class="fa-solid fa-plus"></i></span>
				<span>Add Parameter</span>
			</button>
		</p>
	</div>
{/snippet}

<Level right={[add_item]}></Level>

{#if Array.isArray(data)}
	{#each data as item, index (item._id || index)}
		<div class="field has-addons">
			<p class="control">
				<!-- Enable/Disable Button -->
				{#if item.enabled}
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small is-success"
						onclick={() => {
							item.enabled = false;
							onchange(data);
						}}
					>
						<span class="icon"><i class="fa-solid fa-square-check"></i></span>
					</button>
				{:else}
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small"
						onclick={() => {
							item.enabled = true;
							onchange(data);
						}}
					>
						<span class="icon"><i class="fa-regular fa-square-check"></i></span>
					</button>
				{/if}
			</p>

			<!-- Key Input -->
			<p class="control">
				<input
					class="input is-small"
					type="text"
					placeholder="Param name"
					bind:value={item.key}
					bind:this={keyInputs[index]}
					oninput={() => onchange(data)}
				/>
			</p>

			<!-- Value Input based on Type -->
			{#if item.type === 2}
				<p class="control is-expanded">
					<textarea
						class="textarea is-small"
						bind:value={item.value}
						placeholder="Multiline Value"
						oninput={() => onchange(data)}
					>
					</textarea>
				</p>
			{:else if item.type === 3}
				<p class="control file is-expanded">
					<input
						class="input is-small"
						type="file"
						multiple={false}
						onchange={(event) => {
							item.value = event.target.files;
							onchange(data);
						}}
					/>
				</p>
			{:else}
				<p class="control is-expanded">
					<input
						class="input is-small"
						type="text"
						placeholder="Value"
						bind:value={item.value}
						oninput={() => onchange(data)}
					/>
				</p>
			{/if}

			<!-- Type Selector -->
			<p class="control">
				<span class="select is-small">
					<select
						bind:value={item.type}
						onchange={() => {
							// Reset value when type changes to avoid type mismatch issues (e.g. FileList in text input)
							if (item.type === 3) {
								item.value = undefined;
							} else if (typeof item.value !== 'string') {
								item.value = '';
							}
							onchange(data);
						}}
					>
						{#each fieldTypesVisible as fieldType}
							<option value={fieldType.id}>
								{fieldType.text}
							</option>
						{/each}
					</select>
				</span>
			</p>

			<!-- Delete Button -->
			<p class="control">
				<button
					class="button is-small is-danger"
					onclick={() => removeRow(index)}
					onkeydown={(e) => handleKeydownLast(e, index)}
					title="Delete"
				>
					<span class="icon"><i class="fa-solid fa-trash-can"></i></span>
				</button>
			</p>
		</div>
	{/each}
{/if}
