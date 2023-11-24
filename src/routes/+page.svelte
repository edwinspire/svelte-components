<script>
	import { Table, DialogModal, Plotter, Menu, ColumnTypes } from '../lib/index.js';
	import { onMount } from 'svelte';

	let dataTest = [{ checsk: false, name: '33112321', datas: 'sdasdsad' }, { checsk: true, name: '33ds112321', datas: 'sdasdsadddd' }];


	
	let columns = { checsk: {label: 'CHECK', }, name: {label: 'Nombre'} };

	onMount(() => {});
</script>

<Table {columns} bind:RawDataTable ={dataTest} />
