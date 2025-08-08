<script>
	import { onMount } from 'svelte';
	let { open = bind(true) } = $props();

	let mySidenav;

	let pushContent = false;

	let Menu = [
		{
			title: 'Home',
			icon: 'fas fa-home',
			subMenu: [
				{ title: 'Home1', icon: 'fas fa-home' },
				{
					title: 'Home2',
					icon: 'fas fa-home',
					subMenu: [{ title: 'Home2-1', icon: 'fas fa-home' }]
				}
			]
		},
		{ title: 'Administration', icon: 'fas fa-cog', subMenu: [] },
		{ title: 'Transactions', icon: 'fas fa-money-bill-wave', subMenu: [] }
	];

	function toogleMenu() {
		if (open) {
			closeNav();
		} else if (pushContent) {
			openNavDesplaza();
		} else {
			openNavSobre();
		}
		open = !open;
	}

	function openNavDesplaza() {
		//	console.log('openNavDesplaza', mySidenav, main);
		//		mySidenav.style.width = '250px';
		//	main.style.marginLeft = '250px';
	}

	function closeNav() {
		// Desplaza
		//		mySidenav.style.width = '0';
		//	main.style.marginLeft = '0';
	}

	function openNavSobre() {
		//		mySidenav.style.width = '250px';
	}

	function isArrayNotEmpty(obj) {
		return Array.isArray(obj) && obj.length > 0;
	}

	onMount(() => {
		openNavDesplaza();
	});
</script>

<div bind:this={mySidenav} class="sidenav">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore event_directive_deprecated -->
	<span class="icon has-text-danger is-clickable" onclick={toogleMenu}>
		<i class="fa-solid fa-bars"></i>
	</span>

	<aside class="menu">
		{#each Menu as L1, index}

		
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<p class="menu-label" title="{L1.title}" onclick={() => {
				// Handle click event
				Menu[index].isopen = true;
				console.log('Clicked on', L1.title, Menu[index].isopen);
			//	alert(`Clicked on ${L1.isopen}`);
			}}>
				<span class="icon-text" >
					<span class="icon">
						<i class={L1.icon}></i> {L1.isopen} {Menu[index].isopen}
					</span>
					{#if open}
						<span>{L1.title}</span>

					{/if}
				</span>
			</p>

			{#if isArrayNotEmpty(L1.subMenu)}
				<ul class="menu-list">
					{#each L1.subMenu as L2}
						<li>
							<!-- svelte-ignore a11y_missing_attribute -->
							<a
								><span class="icon-text">
									<span class="icon">
										<i class={L2.icon}></i>
									</span>
									<span>{L2.title}</span>
								</span></a
							>

							{#if isArrayNotEmpty(L2.subMenu)}
								{#each L2.subMenu as L3}
									<ul>
										<li><a>{L3.title}</a></li>
									</ul>
								{/each}
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		{/each}
	</aside>
</div>

<style>
	.sidenav {
		height: 100%;
		position: fixed;
		z-index: 40;
		top: 0;
		left: 0;
		background-color: #111;
		overflow-x: clip;
		transition: 0.5s;
		padding-top: 60px;
	}

	.sidenav .closebtn {
		position: absolute;
		top: 0;
		right: 25px;
		font-size: 36px;
		margin-left: 50px;
	}


</style>
