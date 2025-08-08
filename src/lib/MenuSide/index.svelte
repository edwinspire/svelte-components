<script>
	import { fly } from 'svelte/transition';
	import VerticalMenu from '$lib/MenuWidget/VerticalMenu/index.svelte';

	let mySidenav;
	let main;

	let pushContent = false;
	let open = true;

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
		//mySidenav.style.width = '250px';
		main.style.marginLeft = '250px';
	}

	function closeNav() {
		// Desplaza
		//mySidenav.style.width = '0';
		main.style.marginLeft = '0';
	}

	function openNavSobre() {
		//mySidenav.style.width = '250px';
	}
</script>

<VerticalMenu bind:open></VerticalMenu>

<div bind:this={main} class="main">
	<h2>Sidenav Push Example</h2>

	<p>
		Click on the element below to open the side navigation menu, and push this content to the right.
	</p>
	<span style="font-size: 30px; cursor: pointer" on:click={openNavDesplaza}
		>&#9776; open Desplaza</span
	>
	<span style="font-size: 30px; cursor: pointer" on:click={openNavSobre}>&#9776; open Sobre</span>
</div>

<style>
	.main {
		transition: margin-left 0.5s;
		padding: 16px;
	}
</style>
