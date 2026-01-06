<script>
	import { onMount } from 'svelte';
	import { Level } from '../../index.js';
	import FileUpload from '../../FileUpload/index.svelte';

	let { data = $bindable(), onchange = () => {}, enableFileType = false } = $props();
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

	function addRowEmpty() {
		if (!data || !Array.isArray(data)) {
			data = [{ enabled: true, key: '', value: '' }];
		} else if (!data.find((p) => p.key === '')) {
			data.push({ enabled: true, key: '', value: '' });
		}
		// Crear nueva referencia para disparar reactividad
		data = [...data];
	}

	// ✅ NUEVA FUNCIÓN: Eliminar fila
	function removeRow(index) {
		if (!data || !Array.isArray(data)) return;

		if (confirm('Are you sure you want to delete this parameter?')) {
			// 1. Filtramos el array: mantenemos todo EXCEPTO el que tiene este índice
			const newData = data.filter((_, i) => i !== index);

			// 2. Reasignamos para que Svelte detecte el cambio y actualice el DOM
			data = newData;

			// Opcional: Si quieres notificar al padre inmediatamente
			if (onchange) onchange(data);
		}
	}

	// Efecto para notificar cambios al padre (ya lo tenías, está bien)
	$effect(() => {
		if (onchange) {
			onchange(data);
		}
	});

	onMount(() => {
		// addRowEmpty(); // Descomentar si quieres que inicie con una fila vacía
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

{#each data as item, id}
	<div class="field has-addons">
		<p class="control">
			<!-- Botón de habilitar/deshabilitar -->
			{#if item.enabled}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="button is-small is-success"
					onclick={() => {
						item.enabled = false; // Mutación directa al objeto (Svelte 5 lo detecta en objetos)
						//	data = [...data]; // Nueva referencia del array para actualizar UI
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
						//	data = [...data];
						onchange(data);
					}}
				>
					<span class="icon"><i class="fa-regular fa-square-check"></i></span>
				</button>
			{/if}
		</p>

		<!-- Inputs con bind:value -->
		<p class="control">
			<input
				class="input is-small"
				type="text"
				placeholder="Param name"
				bind:value={item.key}
				onchange={() => {
					onchange(data);
				}}
			/>
		</p>

		{#if item.type === 2}
			<p class="control is-expanded">
				<textarea
					class="textarea is-small"
					bind:value={item.value}
					placeholder="Multiline Value"
					onchange={() => {
						onchange(data);
					}}
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
					onchange={() => {
						onchange(data);
					}}
				/>
			</p>
		{/if}

		<p class="control">
			<span class="select is-small">
				<select
					bind:value={item.type}
					onchange={() => {
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

		<!-- ✅ BOTÓN DE BORRAR  -->
		<p class="control">
			<button class="button is-small is-danger" onclick={() => removeRow(id)} title="Delete">
				<span class="icon"><i class="fa-solid fa-trash-can"></i></span>
			</button>
		</p>
	</div>
{/each}
