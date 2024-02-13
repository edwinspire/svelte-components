<script>
	import {
		Table,
		DialogModal,
		Plotter,
		Menu,
		ColumnTypes,
		SlideFullScreen,
		BasicSelect
	} from '../lib/index.js';
	import { onMount } from 'svelte';

	let dataTest = [
		{ checsk: false, name: '33112321', datas: 'sdasdsad' },
		{ checsk: true, name: '33ds112321', datas: 'sdasdsadddd' }
	];

	let columns = {
		checsk: { label: 'CHECK', decorator: { component: ColumnTypes.BooleanIcon } },
		name: { label: 'Nombre' }
	};
	let show = false;
	let requestData = {
		url: 'https://cat-fact.herokuapp.com/facts/random',
		params: { animal_type: 'cat', amount: 10 }
	};

	onMount(() => {});
</script>

<button
	on:click={() => {
		show = true;
	}}>Mostrar</button
>

<Table bind:columns bind:requestData></Table>
