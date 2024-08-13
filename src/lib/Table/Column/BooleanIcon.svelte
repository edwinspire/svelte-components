<script>
	'use strict';
	export let value;
	export const row = {};
	export let props = {};
	let defaultProps = {
		ontrue: {
			label: 'true',
			iconClass: 'fa-regular fa-square-check',
			iconColorClass: ' has-text-success '
		},
		onfalse: {
			label: 'false',
			iconClass: 'fa-regular fa-square',
			iconColorClass: ' has-text-danger '
		}
	};

	//  console.log(option, value);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<td class="has-text-centered" on:click>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		class="icon-text"
		on:click={() => {
			if (props && props.editInline) {
				value = !value;
			}
		}}
	>
		<span
			class={value
				? props && props['ontrue'] && props['ontrue'].iconColorClass
					? props['ontrue'].iconColorClass + ' icon'
					: defaultProps['ontrue'].iconColorClass + ' icon'
				: props && props['onfalse'] && props['onfalse'].iconColorClass
					? props['onfalse'].iconColorClass + ' icon'
					: defaultProps['onfalse'].iconColorClass + ' icon'}
		>
			{#if value}
				<i
					class={props && props['ontrue'] && props['ontrue'].iconClass
						? props['ontrue'].iconClass
						: defaultProps['ontrue'].iconClass}
				/>
			{:else}
				<i
					class={props && props['onfalse'] && props['onfalse'].iconClass
						? props['onfalse'].iconClass
						: defaultProps['onfalse'].iconClass}
				/>
			{/if}
		</span>

		{#if value}
			<span
				>{props && props['ontrue'] && props['ontrue'].label
					? props['ontrue'].label
					: defaultProps['ontrue'].label}</span
			>
		{:else}
			<span
				>{props && props['onfalse'] && props['onfalse'].label
					? props['onfalse'].label
					: defaultProps['onfalse'].label}</span
			>
		{/if}
	</span>
</td>
