<script>
	'use strict';

	let {
		onclick_cell,
		value = $bindable(),
		row = $bindable(),
		editInline,
		custom,
		css_cell = 'has-text-centered'
	} = $props();

	let defaultconfig = {
		ontrue: {
			label: '',
			iconClass: 'fa-regular fa-square-check',
			iconColorClass: ' has-text-success ',
			css_cell: 'has-text-centered'
		},
		onfalse: {
			label: '',
			iconClass: 'fa-regular fa-square',
			iconColorClass: ' has-text-danger ',
			css_cell: 'has-text-centered'
		}
	};
</script>

{#if custom}
	<td
		class={value
			? custom.ontrue?.css_cell
				? custom.ontrue.css_cell
				: css_cell
			: custom.onfalse?.css_cell
				? custom.onfalse.css_cell
				: css_cell}
		onclick={onclick_cell}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class="icon-text {editInline ? 'is-clickable' : ''}"
			onclick={() => {
				if (editInline) {
					value = !value;
				}
			}}
		>
			<span class="icon">
				{#if value}
					<i
						class="{custom.ontrue?.iconClass
							? custom.ontrue?.iconClass
							: defaultconfig.ontrue?.iconClass} {custom.ontrue?.iconColorClass
							? custom.ontrue?.iconColorClass
							: defaultconfig.ontrue?.iconColorClass}"
					></i>
				{:else}
					<i
						class="{custom.onfalse?.iconClass
							? custom.onfalse?.iconClass
							: defaultconfig.onfalse?.iconClass} {custom.onfalse?.iconColorClass
							? custom.onfalse?.iconColorClass
							: defaultconfig.onfalse?.iconColorClass}"
					></i>
				{/if}
			</span>
			{#if value}
				<span>{custom.ontrue?.label ? custom.ontrue.label : defaultconfig.ontrue.label}</span>
			{:else}
				<span>{custom.onfalse?.label ? custom.onfalse.label : defaultconfig.onfalse.label}</span>
			{/if}
		</span>
	</td>
{:else}
	<td class={css_cell} onclick={onclick_cell}>
		{#if editInline}
			<input type="checkbox" bind:checked={value} />
		{:else}
			<input
				type="checkbox"
				checked={value}
				onclick={(event) => {
					event.preventDefault();
				}}
			/>
		{/if}
	</td>
{/if}
