<script>
	import { onMount } from 'svelte';
	import Nav01 from '../Level/Level.svelte';
	import Menu from '../MenuSide/index.svelte';

	let {
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

	onMount(() => {
		//
	});

	// Toggle Sidebar with 3 states
	function toggleSidebar() {
		WidgetMenu.toggleSidebar();
	}
</script>

{#snippet bntToggleSidebar()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span class="icon is-clickable" onclick={toggleSidebar}>
		<i class="fas fa-bars"></i>
	</span>
{/snippet}

<!-- Sidebar -->
<Menu bind:sidebarState bind:this={WidgetMenu} bind:menu></Menu>

<!-- Top Navigation -->
<span
	class="top-nav"
	class:icons-only={sidebarState === 'icons-only'}
	class:expanded={sidebarState === 'hidden'}
>
	<Nav01  left={left_items_tnv} bind:right={topRightNavBar}></Nav01>
</span>

<!-- Main Content -->
<main
	class="main-content"
	class:icons-only={sidebarState === 'icons-only'}
	class:expanded={sidebarState === 'hidden'}
>
	{@render children?.()}
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

    .top-nav-element{
        width: 100%;
    }

	@media (max-width: 768px) {
		.top-nav {
			left: 0;
			padding: 0 15px;
		}
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
</style>
