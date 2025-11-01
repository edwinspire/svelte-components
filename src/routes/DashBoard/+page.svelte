<script>
	import { onMount } from 'svelte';
	import 'bulma/css/bulma.min.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
    import Table from "$lib/Table/Table.svelte"
	// Estados reactivos
	// sidebarState: 'expanded' | 'icons-only' | 'hidden'
	let sidebarState = $state('icons-only');
	let sidebarActive = $state(false);
	let notificationDropdownActive = $state(false);
	let userDropdownActive = $state(false);
	let currentActiveMenu = $state(0);
	let currentActiveSubMenu = $state(0);
	let lastSidebarStateSelected = '';

	// Responsive state
	let isMobile = $state( false);

	let menu_sections = $state({
		section: [
			{
				title: 'GRUPO 1',
				items: [
					{ label: 'UNO', icon: ' fa-brands fa-font-awesome ', link: '' },
					{ label: 'DOS', icon: ' fa-brands fa-facebook ', link: '' }
				]
			},
			{
				title: 'GRUPO 2',
				items: [
					{ label: 'Alfa', icon: ' fa-brands fa-shopify ', link: '' },
					{ label: 'Beta', icon: ' fa-brands fa-figma ', link: '', badge: 'hola' },
					{
						label: 'Levels',
						icon: ' fa-brands fa-google ',
						items: [
							{ label: 'Submenu 1', icon: '', link: '' },
							{
								label: 'Submenu 2',
								icon: '',
								link: '',
								items: [
									{ label: 'Un nivel mas abajo', items: [{ label: 'oxx' }] },
									{ label: 'Un nivel mas abajito tambien', icon: ' fa-solid fa-user-minus ' }
								]
							},
							{ label: 'Submenu 3', icon: ' fa-solid fa-folder-minus', link: '' }
						]
					}
				]
			}
		]
	});

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});

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

	// Toggle Sidebar with 3 states
	function toggleSidebar() {
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

	// Toggle Notification Dropdown
	function toggleNotificationDropdown(event) {
		event.stopPropagation();
		notificationDropdownActive = !notificationDropdownActive;
		userDropdownActive = false;
	}

	// Toggle User Dropdown
	function toggleUserDropdown(event) {
		event.stopPropagation();
		userDropdownActive = !userDropdownActive;
		notificationDropdownActive = false;
	}

	// Close all dropdowns
	function closeDropdowns(event) {
		if (!event.target.closest('.nav-item')) {
			notificationDropdownActive = false;
			userDropdownActive = false;
		}
	}

	// Handle overlay click (mobile)
	function closeSidebar() {
		sidebarActive = false;
	}

	// Handle dropdown item clicks
	function handleDropdownAction(action) {
		console.log('Dropdown action:', action);
		// Aquí puedes agregar la lógica específica para cada acción
	}

	function selectMenu(internal_menu_id) {
		currentActiveMenu = internal_menu_id;
		currentActiveSubMenu = 0;
	}
</script>

<svelte:window onclick={closeDropdowns} />

{#snippet submenu_item(smi, level = 0.5)}
	<li>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			style="margin-left: {level}em;"
			class="submenu-link icon-text {currentActiveSubMenu == smi.internal_id ? 'active' : ''}"
			onclick={(e) => {
				if (!smi.internal_id) {
					smi.internal_id = Date.now();
				}
				currentActiveSubMenu = smi.internal_id;
				smi.internal_isopen = !smi.internal_isopen;
			}}
		>
			<span class="icon is-small">
				{#if smi.items && smi.items.length > 0}
					<i class="fa-solid {smi.internal_isopen ? 'fa-chevron-down' : 'fa-chevron-right'}"></i>
				{:else if smi.icon}
					<i class={smi.icon}></i>
				{/if}
			</span>
			<span>{smi.label}</span>
		</span>

		{#if smi.internal_isopen}
			{#each smi.items as sm}
				{@render submenu_item(sm, level * 2)}
			{/each}
		{/if}
	</li>
{/snippet}

{#snippet menu_item(data)}
	<li class="menu-item">
		{#if data}
			{#if data.items && data.items.length}
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					href="#"
					class="menu-link"
					class:active={currentActiveMenu === data.internal_id}
					onclick={(e) => {
						if (!data.internal_id) {
							data.internal_id = Date.now();
						}

						//currentActiveMenu = data.internal_id;
						selectMenu(data.internal_id);
						data.internal_isopen = !data.internal_isopen;
					}}
				>
					<i class={data.icon ? data.icon : 'fa-solid fa-play'}></i>
					<span>{data.label}</span>

					<i class="fas {data.internal_isopen ? 'fa-chevron-down' : 'fa-chevron-right'} menu-arrow"
					></i>

					{#if data.badge}
						<span class="menu-badge">{data.badge}</span>
					{/if}
				</a>

				{#if sidebarState === 'expanded' || isMobile}
					<ul class="submenu {data.internal_isopen ? 'open' : ''}">
						{#each data.items as submenu}
							{@render submenu_item(submenu)}
						{/each}
					</ul>
				{/if}
			{:else}
				<a
					href={data.href ? data.href : '#'}
					class="menu-link"
					class:active={currentActiveMenu === data.internal_id}
					onclick={(e) => {
						if (!data.internal_id) {
							data.internal_id = Date.now();
						}

						//currentActiveMenu = data.internal_id;
						selectMenu(data.internal_id);
						data.internal_isopen = !data.internal_isopen;
					}}
				>
					<i class={data.icon ? data.icon : 'fa-solid fa-play'}></i>
					<span>{data.label}</span>

					{#if data.badge}
						<span class="menu-badge">{data.badge}</span>
					{/if}
				</a>
			{/if}
		{/if}
	</li>
{/snippet}

<!-- Overlay para móvil -->
{#if sidebarActive}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay active" onclick={closeSidebar}></div>
{/if}

<!-- Sidebar -->
<aside
	class="sidebar box"
	class:icons-only={sidebarState === 'icons-only'}
	class:hidden={sidebarState === 'hidden'}
	class:active={sidebarActive}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="sidebar-header  " onclick={toggleSidebar}>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" class="sidebar-logo">
			<div class="logo-icon">
				<i class="fas fa-cube"></i>
			</div>
			<span class="logo-text">OpenFusionAPI </span>
		</a>
	</div>

	<ul class="sidebar-menu">
		{#each menu_sections.section as section}
			<li class="menu-section-title">{section.title}</li>
			{#each section.items as item}
				{@render menu_item(item)}
			{/each}
		{/each}
	</ul>

	<div class="upgrade-card">
		<h5>Upgrade To Pro</h5>
		<p>To get more features and components</p>
		<button
			class="button is-primary is-small is-fullwidth"
			onclick={() => handleDropdownAction('Buy Now')}>Buy Now</button
		>
	</div>
</aside>

<div class="box"></div>

<!-- Top Navigation -->
<nav
	class="top-nav box"
	class:icons-only={sidebarState === 'icons-only'}
	class:expanded={sidebarState === 'hidden'}
>
	<div class="nav-left">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="toggle-btn" onclick={toggleSidebar}>
			<i class="fas fa-bars"></i>
		</button>
	</div>

	<div class="nav-right">
		<div class="nav-item">
			<button class="nav-link" onclick={toggleNotificationDropdown}>
				<i class="fas fa-bell"></i>
				<span class="badge">30</span>
			</button>

			<div class="dropdown-menu" class:active={notificationDropdownActive}>
				<div class="dropdown-header">
					<h4>Notifications</h4>
				</div>
				<div class="dropdown-body">
					<div class="notification-item">
						<div class="notification-content">
							<div class="notification-icon danger">
								<i class="fas fa-user"></i>
							</div>
							<div class="notification-text">
								<h5>Challenge invitation</h5>
								<p><strong>Jonny aber</strong> invites to join the challenge</p>
								<span class="notification-time">12 hour ago</span>
								<div class="notification-actions">
									<button onclick={() => handleDropdownAction('Decline challenge')}>Decline</button>
									<button class="primary" onclick={() => handleDropdownAction('Accept challenge')}
										>Accept</button
									>
								</div>
							</div>
						</div>
					</div>
					<div class="notification-item">
						<div class="notification-content">
							<div class="notification-icon info">
								<i class="fas fa-file-alt"></i>
							</div>
							<div class="notification-text">
								<h5>Forms</h5>
								<p>Lorem Ipsum is simply dummy text of the printing</p>
								<span class="notification-time">2 hour ago</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="nav-item">
			<button class="nav-link" onclick={toggleSidebar}>
				<i class="fas fa-envelope"></i>
				<span class="badge">5</span>
			</button>
		</div>

		<div class="nav-item">
			<div class="user-profile" onclick={toggleUserDropdown}>
				<img src="https://via.placeholder.com/36" alt="User" class="user-avatar" />
				<div class="user-info">
					<div class="user-name">Joseph William</div>
					<div class="user-role">Administrator</div>
				</div>
				<i class="fas fa-chevron-down" style="font-size: 12px; color: var(--text-secondary);"></i>
			</div>

			<div class="dropdown-menu" class:active={userDropdownActive}>
				<div class="dropdown-header">
					<h4>Profile</h4>
				</div>
				<div class="dropdown-body">
					<div class="notification-item">
						<div class="notification-content">
							<img
								src="https://via.placeholder.com/50"
								alt="User"
								class="user-avatar"
								style="width: 50px; height: 50px;"
							/>
							<div class="notification-text">
								<h5>Carson Darrin</h5>
								<p>carson.darrin@example.com</p>
								<span class="badge is-primary">PRO</span>
							</div>
						</div>
					</div>
					<div class="notification-item">
						<a
							href="#"
							class="dropdown-item"
							onclick={() => handleDropdownAction('Change password')}
						>
							<i class="fas fa-key"></i> Change password
						</a>
					</div>
					<div class="notification-item">
						<a href="#" class="dropdown-item" onclick={() => handleDropdownAction('Recently mail')}>
							<i class="fas fa-envelope"></i> Recently mail
						</a>
					</div>
					<div class="notification-item">
						<a
							href="#"
							class="dropdown-item"
							onclick={() => handleDropdownAction('Schedule meetings')}
						>
							<i class="fas fa-calendar"></i> Schedule meetings
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<!-- Main Content -->
<main
	class="main-content box "
	class:icons-only={sidebarState === 'icons-only'}
	class:expanded={sidebarState === 'hidden'}
>
	<div class="m"><Table></Table></div>
</main>

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

	/* Sidebar */
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: var(--sidebar-width);
		background: var(--sidebar-bg);
		transition: all 0.3s ease;
		z-index: 1000;
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
		background: #151922;
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
		color: white;
		font-size: 20px;
	}

	.logo-text {
		color: white;
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

	.menu-item {
		position: relative;
	}

	.menu-link {
		display: flex;
		align-items: center;
		padding: 12px 20px;
		color: #a2a3b7;
		text-decoration: none;
		transition: all 0.3s;
		position: relative;
		cursor: pointer;
		border: none;
		background: none;
		font-size: 0.95em;
		width: 100%;
		text-align: left;
	}

	.menu-link:hover,
	.menu-link.active {
		background: rgba(67, 97, 238, 0.1);
		color: white;
	}

	.menu-link.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: var(--sidebar-hover);
	}

	.menu-link i:first-child {
		width: 24px;
		margin-right: 12px;
		font-size: 18px;
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

	.submenu {
		display: none;
		background: rgba(0, 0, 0, 0.2);
		list-style: none;
	}

	.submenu.open {
		display: block;
	}

	.submenu-link {
		display: block;
		padding: 10px 20px 10px 40px;
		color: #a2a3b7;
		text-decoration: none;
		transition: all 0.3s;
		font-size: 14px;
		cursor: pointer;
	}

	.submenu-link:hover {
		background: rgba(67, 97, 238, 0.1);
		color: white;
	}
	.submenu-link.active {
		border-left-style: solid;
		border-left-color: cornflowerblue;
		margin-left: 1em;
	}

	/* Upgrade Card */
	.upgrade-card {
		margin: 20px;
		background: linear-gradient(135deg, var(--sidebar-hover), #3f51b5);
		border-radius: 12px;
		padding: 20px;
		color: white;
	}

	.upgrade-card h5 {
		margin-bottom: 8px;
		font-size: 16px;
	}

	.upgrade-card p {
		margin-bottom: 15px;
		font-size: 13px;
		opacity: 0.9;
	}

	/* Top Navigation */
	.top-nav {
		position: fixed;
		top: 0;
		left: var(--sidebar-width);
		right: 0;
		height: var(--topbar-height);
		background: var(--topbar-bg);
		display: flex;
		align-items: center;
		padding: 0 20px;
		transition: all 0.3s ease;
		z-index: 999;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.top-nav.icons-only {
		left: var(--sidebar-width-icons);
	}

	.top-nav.expanded {
		left: 0;
	}

	@media (max-width: 768px) {
		.top-nav {
			left: 0;
			padding: 0 15px;
		}
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

	.user-profile {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		cursor: pointer;
		border-radius: 8px;
		transition: background 0.3s;
	}

	.user-profile:hover {
		background: #f0f3f7;
	}

	.user-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		object-fit: cover;
	}

	.user-info {
		display: none;
	}

	@media (min-width: 768px) {
		.user-info {
			display: block;
		}
	}

	.user-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.user-role {
		font-size: 12px;
		color: var(--text-secondary);
	}

	/* Dropdown */
	.dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		background: white;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
		min-width: 280px;
		display: none;
		z-index: 1001;
	}

	.dropdown-menu.active {
		display: block;
	}

	.dropdown-header {
		padding: 15px 20px;
		border-bottom: 1px solid var(--border-color);
	}

	.dropdown-header h4 {
		font-size: 16px;
		margin: 0;
		color: var(--text-primary);
	}

	.dropdown-body {
		max-height: 300px;
		overflow-y: auto;
	}

	.notification-item {
		padding: 15px 20px;
		border-bottom: 1px solid var(--border-color);
		transition: background 0.3s;
	}

	.notification-item:hover {
		background: #f8f9fa;
	}

	.notification-item:last-child {
		border-bottom: none;
	}

	.notification-content {
		display: flex;
		gap: 12px;
	}

	.notification-icon {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.notification-icon.danger {
		background: #ffe4e6;
		color: #ef4444;
	}

	.notification-icon.info {
		background: #dbeafe;
		color: #3b82f6;
	}

	.notification-text h5 {
		font-size: 14px;
		margin-bottom: 4px;
		color: var(--text-primary);
	}

	.notification-text p {
		font-size: 13px;
		color: var(--text-secondary);
		margin-bottom: 8px;
	}

	.notification-time {
		font-size: 11px;
		color: var(--text-secondary);
	}

	.notification-actions {
		display: flex;
		gap: 8px;
		margin-top: 10px;
	}

	.notification-actions button {
		padding: 4px 12px;
		border: 1px solid var(--border-color);
		background: white;
		border-radius: 20px;
		font-size: 12px;
		cursor: pointer;
		transition: all 0.3s;
	}

	.notification-actions button:hover {
		background: #f0f3f7;
	}

	.notification-actions button.primary {
		background: var(--sidebar-hover);
		color: white;
		border-color: var(--sidebar-hover);
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--text-primary);
		text-decoration: none;
		font-size: 14px;
		cursor: pointer;
	}

	.dropdown-item:hover {
		color: var(--sidebar-hover);
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

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
	}

	.breadcrumb-item {
		color: var(--text-secondary);
	}

	.breadcrumb-item:not(:last-child)::after {
		content: '/';
		margin-left: 8px;
	}

	.breadcrumb-item:last-child {
		color: var(--text-primary);
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

	/* Button styles (similar to Bulma) */
	.button {
		display: inline-block;
		border: 1px solid transparent;
		border-radius: 4px;
		font-size: 1rem;
		line-height: 1.5;
		padding: 0.5em 1em;
		text-align: center;
		vertical-align: top;
		cursor: pointer;
		text-decoration: none;
		white-space: nowrap;
		transition: all 0.3s;
	}

	.button.is-primary {
		background-color: var(--sidebar-hover);
		border-color: var(--sidebar-hover);
		color: white;
	}

	.button.is-small {
		font-size: 0.75rem;
		padding: 0.375em 0.75em;
	}

	.button.is-fullwidth {
		width: 100%;
	}

	.button:hover:not(.is-loading) {
		filter: brightness(1.1);
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

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.dropdown-menu {
			min-width: 250px;
		}
	}
</style>
