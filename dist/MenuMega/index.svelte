<script>
	let { brand = $bindable([]), start = $bindable([]), end = $bindable([]) } = $props();

	let showMenu = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#snippet basic_item(item)}
	{#if item.link && item.link.length > 1}
		<a class="navbar-item" href={item.link}>
			{#if item.icon}
				<i class={item.icon}></i>
			{/if}
			{item.label}
		</a>
	{:else if item.component}
		<!-- svelte-ignore a11y_missing_attribute -->
		<a class="navbar-item">
			{@render item.component?.()}
			{item.label}
		</a>
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_missing_attribute -->
		<a class="navbar-item" onclick={item.onclick}>
			{#if item.icon}
				<i class={item.icon}></i>
			{/if}
			{item.label}
		</a>
	{/if}
{/snippet}

{#snippet navbar_item(item)}
	{#if item}
		{#if item.divider}
			<hr class="navbar-divider" />
		{:else if item.submenu?.columns && Array.isArray(item.submenu?.columns)}
			<div class="navbar-item has-dropdown is-hoverable is-mega">
				<div class="navbar-link flex link_dropdown">
					{item.label}
				</div>
				<div class="navbar-dropdown" data-style="width: 18rem;">
					<div class="box">
						<div class="container is-fluid">
							<div class="columns">
								{#each item.submenu.columns as column}
									<div class="column">
										<h1 class="title is-6 is-mega-menu-title">{column.title}</h1>

										{#each column.items as item}
											{@render navbar_item(item)}
										{/each}
									</div>
								{/each}
							</div>
						</div>
						{#if item.submenu.footer}
							<hr class="navbar-divider" />

							<div class="navbar-item">
								<div class="navbar-content">
									<div class="level is-mobile">
										<div class="level-left">
											<div class="level-item">
												{#if item.submenu.footer.left}
													{@render basic_item(item.submenu.footer.left)}
												{/if}
											</div>
										</div>
										<div class="level-right">
											<div class="level-item">
												{#if item.submenu.footer.right}
													{@render basic_item(item.submenu.footer.right)}
												{/if}
											</div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{:else if item.submenu && Array.isArray(item.submenu)}
			<div class="navbar-item has-dropdown is-hoverable is-shadowless">
				<span class="navbar-link link_dropdown"
					>{#if item.icon}
						<i class={item.icon}></i>
					{/if}
					{item.label}
				</span>

				<div class="navbar-dropdown">
					<div class="box">
						{#each item.submenu as submenu}
							{@render navbar_item(submenu)}
						{/each}
					</div>
				</div>
			</div>
		{:else}
			{@render basic_item(item)}
		{/if}
	{/if}
{/snippet}

<nav class="navbar is-shadowless border-bottom-grey">
	<div class="navbar-brand">
		{#if Array.isArray(brand)}
			{#each brand as brand_item}
				{@render navbar_item?.(brand_item)}
			{/each}
		{/if}

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="navbar-burger {showMenu ? 'is-active' : ''}"
			onclick={() => {
				showMenu = !showMenu;
				console.log(showMenu);
			}}
		>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</div>
	</div>

	<div class="navbar-menu {showMenu ? 'is-active' : ''}">
		<div class="navbar-start">
			{#if Array.isArray(start)}
				{#each start as start_item}
					{@render navbar_item?.(start_item)}
				{/each}
			{/if}
		</div>

		<div class="navbar-end">
			{#if Array.isArray(end)}
				{#each end as end_item}
					{@render navbar_item?.(end_item)}
				{/each}
			{/if}
		</div>
	</div>
</nav>

<style>
	.navbar-brand,
	.navbar-tabs {
		min-height: auto;
	}
	.navbar-item.is-mega {
		position: static;

		.is-mega-menu-title {
			margin-bottom: 0;
			padding: 0.375rem;
		}
	}

	.navbar-item,
	.navbar-link {
		display: flex;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
	}

	.link_dropdown {
		padding: 0.1rem 2.1rem 0.4rem 0.5rem !important;
	}

	.navbar-link:not(.is-arrowless):after {
		margin-top: -0.5em;
		margin-right: -0.3rem;
	}
	.navbar-dropdown {
		padding-bottom: 0.0rem;
	}
</style>
