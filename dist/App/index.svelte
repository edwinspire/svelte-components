<script>
	import { onMount, onDestroy } from 'svelte';
	import { Level, MenuSide, Notify } from '../index.js';

	/**
	 * Main wrapper component for the Application layout.
	 * Provides a responsive Sidebar, dynamic Top Nav, and a Main Content area.
	 * 
	 * @typedef {Object} AppBaseProps
	 * @property {string} [logoText='LOGO TEXT'] - The text displayed on the sidebar logo.
	 * @property {import('svelte').Snippet} [logoIcon] - A snippet providing the icon for the logo.
	 * @property {Array<any>} [topRightNavBar=[]] - Elements to display on the top-right corner of the navigation bar.
	 * @property {Array<any>} [topLeftNavBar=[]] - Elements to display on the top-left corner beside the sidebar toggle.
	 * @property {import('svelte').Snippet} [children] - The main application content.
	 * @property {Array<any>} [menu=[]] - Array definition defining the sidebar's Menu widget items.
	 */

	/** @type {AppBaseProps & Record<string, any>} */
	let {
		logoText = $bindable('LOGO TEXT'),
		logoIcon = $bindable(iconFallback),
		topRightNavBar = $bindable([]),
		topLeftNavBar = $bindable([]),
		children,
		menu = $bindable([])
	} = $props();

	let sidebarState = $state('');
	let WidgetMenu;

	let left_items_tnv = $derived.by(() => {
		//bntToggleSidebar
		return [bntToggleSidebar].concat(topLeftNavBar);
	});

	// Toggle Sidebar with 3 states
	function toggleSidebar() {
		WidgetMenu.toggleSidebar();
	}

	let element_top_nav;
	let dimensions_top_nav = $state({ width: 0, height: 60 });
	let cleanupResize;

	onMount(() => {
		let resizeObserver;
		if ('ResizeObserver' in window && element_top_nav) {
			resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					const { width, height } = entry.contentRect;
					dimensions_top_nav = { width: Math.round(width), height: Math.round(height) };
				}
			});

			resizeObserver.observe(element_top_nav);
			cleanupResize = () => resizeObserver.disconnect();
		} else {
			// Fallback para navegadores antiguos
			const updatedimensions_top_nav = () => {
				if (element_top_nav) {
					dimensions_top_nav = {
						width: Math.round(element_top_nav.offsetWidth),
						height: Math.round(element_top_nav.offsetHeight)
					};
				}
			};

			window.addEventListener('resize', updatedimensions_top_nav);
			updatedimensions_top_nav();

			cleanupResize = () => window.removeEventListener('resize', updatedimensions_top_nav);
		}
	});

	onDestroy(() => {
		if (cleanupResize) {
			cleanupResize();
		}
	});


</script>

{#snippet iconFallback()}
	<i class="fas fa-cube"></i>
{/snippet}

{#snippet bntToggleSidebar()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span class="icon is-clickable" onclick={toggleSidebar}>
		<i class="fas fa-bars"></i>
	</span>
{/snippet}

<!-- Sidebar -->
<MenuSide bind:logoIcon bind:logoText bind:sidebarState bind:this={WidgetMenu} bind:menu></MenuSide>

<!-- Top Navigation -->
<span
	bind:this={element_top_nav}
	class="top-nav"
	class:icons-only={sidebarState === 'icons-only'}
	class:expanded={sidebarState === 'hidden'}
>
	<Level left={left_items_tnv} bind:right={topRightNavBar}></Level>
</span>

<!-- Main Content -->
<main
	class="main-content"
	style:--topbar-height={dimensions_top_nav.height + 'px'}
	style:margin-top="var(--topbar-height)"
	class:icons-only={sidebarState === 'icons-only'}
	class:expanded={sidebarState === 'hidden'}
>
	{@render children?.()}
</main>

<!-- Notify widget -->
<Notify></Notify>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(:root) {
		--sidebar-width: 250px;
		--sidebar-width-icons: 55px;
		--topbar-height: 60px;

		/* Default Light Theme */
		--topbar-bg: #ffffff;
		--sidebar-bg: #ffffff;
		--app-bg: #f5f7fa;
		--text-primary: #2c3e50;
		--text-secondary: #7f8c8d;
		--border-color: rgba(0, 0, 0, 0.1);
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--topbar-bg: #1a1a1a;
			--sidebar-bg: #1a1a1a;
			--app-bg: #121212;
			--text-primary: #ecf0f1;
			--text-secondary: #bdc3c7;
			--border-color: rgba(255, 255, 255, 0.1);
		}
	}


	/* Top Navigation */
	.top-nav {
		position: fixed;
		top: 0;
		left: var(--sidebar-width);
		right: 0;
		height: var(--topbar-height);
		background: var(--topbar-bg);
		border-bottom: 1px solid var(--border-color);
		color: var(--text-primary);

		display: flex;
		align-items: center;
		padding: 0 24px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 38; /* Slightly below sidebar to let it overlap if needed */
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
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
			padding: 0 10px;
		}
	}

	/* Main Content */
	.main-content {
		margin-left: var(--sidebar-width);
		padding: 24px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-height: calc(100vh - var(--topbar-height));
		background-color: var(--app-bg);
		color: var(--text-primary);
		width: auto;
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
			padding: 5px 5px;
		}
	}
</style>
