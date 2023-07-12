<script>
	export let classSize = 'is-small';
	export let tabs = [
		{ label: 'Pictures', classIcon: 'fas fa-picture', slot: 'picture', isActive: false },
		{ label: 'Calcs', classIcon: 'fas fa-picture', slot: 'music', isActive: true },
		{ label: 'Film', classIcon: 'fas fa-film', slot: 'film', isActive: false }
	];

	const withIcons = (currentValue) => currentValue.classIcon && currentValue.classIcon.length > 3;
</script>

<div class="tabs is-boxed {classSize}">
	<ul>
		{#each tabs as item}
			<li class={item.isActive ? 'is-active' : ''}>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a>
					{#if tabs.every(withIcons)}
						<span class="icon"><i class={item.classIcon} aria-hidden="true" /></span>
						<span>{item.label}</span>
					{:else}
						{item.label}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>
<slot />
