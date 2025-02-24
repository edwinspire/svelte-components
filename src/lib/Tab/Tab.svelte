<script>
	//import { createEventDispatcher } from 'svelte';
	let {
		classSize = $bindable('is-small'),
		onselect,
		tabs = $bindable([
			{
				label: 'Pictures',
				classIcon: 'fas fa-picture',
				disabled: true
			},
			{ label: 'Calcs', classIcon: 'fas fa-picture' },
			{ label: 'Film', classIcon: 'fas fa-film', disabled: true }
		]),
		active = $bindable(0)
	} = $props();
</script>

<div class="tabs is-boxed {classSize} tabMargin">
	<ul>
		{#if tabs}
			{#each tabs as item, i}
				<li class={active == i ? 'is-active' : ''}>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_missing_attribute -->
					<a
						onclick={() => {
							console.log('click ', active);
							if (!item.disabled) {
								active = i;
								// Solo dispara cuando no está deshabilitado
								if (onselect) {
									onselect({ label: item.label, index: i });
								}
							}
						}}
					>
						{#if item.disabled}
							<span class="icon {classSize}"
								><i class="fa-solid fa-ban" aria-hidden="true"></i></span
							>
							<span>{item.label}</span>
						{:else if item.classIcon && item.classIcon.length > 3}
							<span class="icon {classSize}"><i class={item.classIcon} aria-hidden="true"></i></span
							>
							<span>{item.label}</span>
						{:else}
							{item.label}
						{/if}
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</div>

{#if Array.isArray(tabs)}
	{#each tabs as element, i}
		{#if active == i}
			{#if element && element.component && !element.disabled}
				{@render element.component?.()}
			{/if}
		{/if}
	{/each}
{/if}

<style>
	.tabMargin {
		margin-bottom: 0.75em;
	}
</style>
