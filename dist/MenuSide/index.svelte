<script>
	import { onMount } from 'svelte';
	let {
		logoText = $bindable('LOGO TEXT'),
		logoIcon = $bindable(iconFallback),
		isMobile = $bindable(false),
		sidebarState = $bindable('icons-only'),
		menu = $bindable([
			{
				title: 'GRUP 01',
				items: [
					{ label: 'Demo Font', icon: ' fa-brands fa-font-awesome ', link: '' },
					{ label: 'Demo Face', icon: ' fa-brands fa-facebook ', link: '' }
				]
			}
		])
	} = $props();

	// sidebarState: 'expanded' | 'icons-only' | 'hidden'
	let sidebarActive = $state(false);

	let currentActiveMenu = $state(0);
	let lastSidebarStateSelected = '';

	onMount(() => {
		while (sidebarState != 'icons-only') {
			toggleSidebar();
		}
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});

	// Toggle Sidebar with 3 states
	export function toggleSidebar() {
		if (isMobile) {
			sidebarActive = !sidebarActive;
		} else {
			// Cycle through: icons-only -> expanded -> hidden -> icons-only
			if (sidebarState === 'icons-only') {
				sidebarState = 'expanded';
			} else if (sidebarState === 'expanded') {
				sidebarState = 'hidden';
			} else {
				// sidebarState === 'hidden'
				sidebarState = 'icons-only';
			}
		}
		lastSidebarStateSelected = sidebarState;
	}

	function checkScreenSize() {
		isMobile = window.innerWidth <= 768;
		if (!isMobile && sidebarActive) {
			sidebarActive = false;
		}
		if (isMobile) {
			sidebarState = 'hidden';
		} else {
			sidebarState = lastSidebarStateSelected;
		}
	}

	// Handle overlay click (mobile)
	function closeSidebar() {
		sidebarActive = false;
	}
</script>

{#snippet snp_menu_item(item)}
	{#if item && !item.hidden}
		<li class={item.enabled === false ? 'disabled-item' : ''}>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<a
				title={item.label}
				class={currentActiveMenu == item.internal_id ? 'is-active' : ''}
				onclick={(e) => {
					if (item.enabled !== false) {
						if (!item.internal_id) {
							item.internal_id = Date.now();
						}
						currentActiveMenu = item.internal_id;
						item.internal_isopen = !item.internal_isopen;
						if (item.onclick) {
							item.onclick();
						}
					}
				}}
				><span class="icon-text">
					{#if item.icon && item.icon.length > 0}
						<span class="icon">
							<i class={item.icon}></i>
						</span>
					{/if}
					{#if sidebarState !== 'icons-only'}
						<span>{item.label}</span>
					{/if}
					{#if sidebarState !== 'icons-only' && item.items && item.items.length > 0}
						<span class="submenu_arrow"
							><i
								class=" {item.internal_isopen
									? 'fa-solid fa-chevron-down'
									: 'fa-solid fa-chevron-right'}"
							></i></span
						>
					{/if}
				</span>
			</a>
			{#if sidebarState !== 'icons-only' && item.internal_isopen && item.items && item.items.length > 0}
				<ul>
					{#each item.items as subitem}
						{@render snp_menu_item(subitem)}
					{/each}
				</ul>
			{/if}
		</li>
	{/if}
{/snippet}

{#snippet snp_section(section)}
	{#if sidebarState !== 'icons-only'}
		<p class="menu-label">{section.title}</p>
	{/if}

	{#if section.items && section.items.length > 0}
		<ul class="menu-list">
			{#each section.items as menu_item}
				{@render snp_menu_item(menu_item)}
			{/each}
		</ul>
	{/if}
{/snippet}

{#snippet iconFallback()}
	<i class="fas fa-cube"></i>
{/snippet}

<!-- Overlay para móvil -->
{#if sidebarActive}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay active" onclick={closeSidebar}></div>
{/if}

<!-- Sidebar -->
<aside
	class="sidebar menu box"
	class:icons-only={sidebarState === 'icons-only'}
	class:hidden={sidebarState === 'hidden'}
	class:active={sidebarActive}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="sidebar-header" onclick={toggleSidebar}>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" class="sidebar-logo">
			<div class="logo-icon">
				{#if logoIcon}
					{@render logoIcon()}
				{:else}
					<i class="fas fa-cube"></i>
				{/if}
			</div>
			<span class="logo-text">{logoText} </span>
		</a>
	</div>

	{#each menu as section}
		{@render snp_section(section)}
	{/each}
</aside>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(:root) {
		--sidebar-width: 250px;
		--sidebar-width-icons: 80px;
		--topbar-height: 70px;
	}

	/* Overlay para móvil */
	.overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}

	.overlay.active {
		display: block;
	}

	.section_border {
		border-top: 1px solid rgb(204, 204, 204);
	}

	.submenu_arrow {
		position: absolute;
		right: 1em;
	}
	/* Sidebar */
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: var(--sidebar-width);
		background: var(--sidebar-bg);
		transition: all 0.3s ease;
		z-index: 39;
		overflow-y: auto;
		overflow-x: hidden;
	}

	/* Sidebar Icons-Only State */
	.sidebar.icons-only {
		width: var(--sidebar-width-icons);
	}

	.sidebar.icons-only .logo-text,
	.sidebar.icons-only .menu-section-title,
	.sidebar.icons-only .menu-link span,
	.sidebar.icons-only .menu-badge,
	.sidebar.icons-only .menu-arrow,
	.sidebar.icons-only .upgrade-card {
		display: none;
	}

	.sidebar.icons-only .menu-link {
		justify-content: center;
		padding: 12px;
	}

	.sidebar.icons-only .menu-link i:first-child {
		margin-right: 0;
	}

	.sidebar.icons-only .sidebar-logo {
		justify-content: center;
	}

	/* Sidebar Hidden State */
	.sidebar.hidden {
		left: calc(-1 * var(--sidebar-width));
	}

	@media (max-width: 768px) {
		.sidebar {
			left: calc(-1 * var(--sidebar-width));
		}

		.sidebar.active {
			left: 0;
		}
	}

	.sidebar::-webkit-scrollbar {
		width: 6px;
	}

	.sidebar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
	}

	.sidebar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
	}

	.sidebar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.sidebar-header {
		padding: 15px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.sidebar-logo {
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
	}

	.logo-icon {
		width: 40px;
		height: 40px;
		background: var(--sidebar-hover);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
	}

	.logo-text {
		font-size: 20px;
		font-weight: 600;
	}

	.sidebar-menu {
		list-style: none;
		padding: 20px 0;
	}

	.menu-section-title {
		padding: 0 20px;
		margin-bottom: 10px;
		color: #6c7293;
		font-size: 1em;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.menu-badge {
		margin-left: auto;
		background: var(--sidebar-hover);
		color: white;
		padding: 2px 8px;
		border-radius: 12px;
		font-size: 10px;
		font-weight: 600;
	}

	.menu-arrow {
		margin-left: auto;
		transition: transform 0.3s;
		font-size: 12px;
	}

	.nav-left {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.toggle-btn {
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		color: var(--text-secondary);
		padding: 8px;
		border-radius: 6px;
		transition: all 0.3s;
	}

	.toggle-btn:hover {
		background: #f0f3f7;
		color: var(--text-primary);
	}

	.nav-right {
		display: flex;
		align-items: center;
		margin-left: auto;
		gap: 10px;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-secondary);
		border-radius: 8px;
		transition: all 0.3s;
		position: relative;
	}

	.nav-link:hover {
		background: #f0f3f7;
		color: var(--text-primary);
	}

	.nav-link .badge {
		position: absolute;
		top: 8px;
		right: 8px;
		background: #ff4757;
		color: white;
		border-radius: 10px;
		padding: 2px 6px;
		font-size: 10px;
		font-weight: bold;
		min-width: 18px;
		text-align: center;
	}

	/* Main Content */
	.main-content {
		margin-left: var(--sidebar-width);
		margin-top: var(--topbar-height);
		padding: 0.5em;
		transition: all 0.3s ease;
		min-height: calc(100vh - var(--topbar-height));
	}

	.main-content.icons-only {
		margin-left: var(--sidebar-width-icons);
	}

	.main-content.expanded {
		margin-left: 0;
	}

	@media (max-width: 768px) {
		.main-content {
			margin-left: 0;
			padding: 20px 15px;
		}
	}

	/* Page Header */
	.page-header {
		margin-bottom: 25px;
	}

	.page-title {
		font-size: 24px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 8px;
	}

	/* Dashboard Placeholder */
	.dashboard-placeholder {
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		border-radius: 8px;
		border: 2px dashed var(--border-color);
	}

	.placeholder-content {
		text-align: center;
		color: var(--text-secondary);
	}

	.placeholder-content i {
		font-size: 48px;
		margin-bottom: 15px;
		opacity: 0.5;
	}

	/* Badge styles */
	.badge {
		display: inline-block;
		padding: 0.25em 0.5em;
		font-size: 0.75em;
		font-weight: 600;
		line-height: 1;
		color: white;
		text-align: center;
		white-space: nowrap;
		vertical-align: top;
		border-radius: 0.25em;
	}

	.badge.is-primary {
		background-color: var(--sidebar-hover);
	}

	.disabled-item {
		pointer-events: none; /* Prevents all mouse events on the element */
		opacity: 0.2; /* Makes the element appear faded */
		cursor: not-allowed; /* Changes the cursor to indicate it's not interactive */
	}
</style>
