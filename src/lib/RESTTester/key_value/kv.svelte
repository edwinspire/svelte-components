<script>
	import { onMount } from 'svelte';
	import { Level } from '../../index.js';

	let { data = $bindable(), onchange = () => {} } = $props();

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
					class="button is-small"
					onclick={() => {
						item.enabled = false; // Mutación directa al objeto (Svelte 5 lo detecta en objetos)
						data = [...data]; // Nueva referencia del array para actualizar UI
					}}
				>
					<span class="icon"><i class="fa-regular fa-square-check"></i></span>
				</button>
			{:else}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="button is-small is-success"
					onclick={() => {
						item.enabled = true;
						data = [...data];
					}}
				>
					<span class="icon"><i class="fa-solid fa-square-check"></i></span>
				</button>
			{/if}
		</p>

		<!-- Inputs con bind:value -->
		<p class="control">
			<input class="input is-small" type="text" placeholder="Param name" bind:value={item.key} />
		</p>

		{#if item.multiline}
			<p class="control is-expanded">
				<textarea class="textarea is-small" bind:value={item.value} placeholder="Multiline Value"
				></textarea>
			</p>
		{:else}
			<p class="control is-expanded">
				<input class="input is-small" type="text" placeholder="Value" bind:value={item.value} />
			</p>
		{/if}

		<p class="control">
			<button
				class="button is-small {item.multiline ? 'is-success' : ''}"
				onclick={() => {
					item.multiline = !item.multiline;
					data = [...data];
				}}
				title="Multiline"
			>
				<span class="icon"><i class="fa-solid fa-grip-lines"></i></span>
			</button>
		</p>

		<!-- ✅ BOTÓN DE BORRAR MODIFICADO -->
		<p class="control">
			<button class="button is-small is-danger" onclick={() => removeRow(id)} title="Delete">
				<span class="icon"><i class="fa-solid fa-trash-can"></i></span>
			</button>
		</p>
	</div>
{/each}
