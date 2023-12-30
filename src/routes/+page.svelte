<script>
	import { Table, DialogModal, Plotter, Menu, ColumnTypes, SlideFullScreen } from '../lib/index.js';
	import { onMount } from 'svelte';

	let dataTest = [{ checsk: false, name: '33112321', datas: 'sdasdsad' }, { checsk: true, name: '33ds112321', datas: 'sdasdsadddd' }];


	
	let columns = { checsk: {label: 'CHECK', decorator: {component: ColumnTypes.BooleanIcon} }, name: {label: 'Nombre'} };

	onMount(() => {});
</script>

<SlideFullScreen></SlideFullScreen>