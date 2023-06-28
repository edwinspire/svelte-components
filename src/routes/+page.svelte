<script>
	import { Table, DialogModal, Plotter } from '../lib/index.js';
	import { onMount } from 'svelte';

	let dataTest = [];

	let arriba = false;
	let cantidad = 0;

	onMount(() => {
		setInterval(() => {
			let t = Math.floor(Math.random() * 10) + 1000;
			cantidad++;

			if (!arriba) {
				t = Math.floor(Math.random() * 10) + 1;
			}

			if (cantidad > 10) {
				cantidad = 0;
				arriba = !arriba;
			}

			dataTest.push({
				date: Date.now(),
				time: t
			});
		//console.log('dataTest', dataTest);
		dataTest = dataTest;
		}, 100);
	});
</script>

<Plotter bind:dataInput={dataTest} />
