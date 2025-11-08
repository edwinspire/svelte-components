<script>
	import { onMount, onDestroy } from 'svelte';
	import { Level, MenuSide, Notify } from '../index.js';

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
	let resizeObserver;

	onMount(() => {
		if ('ResizeObserver' in window && element_top_nav) {
			resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					const { width, height } = entry.contentRect;
					dimensions_top_nav = { width: Math.round(width), height: Math.round(height) };
				}
			//	console.log(dimensions_top_nav);
			});

			resizeObserver.observe(element_top_nav);
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

			onDestroy(() => {
				window.removeEventListener('resize', updatedimensions_top_nav);
			});
		}
	});

	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
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
	style:margin-top={dimensions_top_nav.height + 'px'}
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
		/* --topbar-height: 70px; */
	}

	/* Top Navigation */
	.top-nav {
		position: fixed;
		top: 0;
		left: var(--sidebar-width);
		right: 0;
		/* height: var(--topbar-height); */
		background: var(--topbar-bg);

		align-items: center;
		padding: 0 20px;
		transition: all 0.3s ease;
		z-index: 39;
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
			padding: 0 10px;
		}
	}

	/* Main Content */
	.main-content {
		margin-left: var(--sidebar-width);
		/* margin-top: var(--topbar-height); */
		padding: 0.5em;
		transition: all 0.3s ease;
		min-height: calc(100vh - var(--topbar-height));
		width: inherit;
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
