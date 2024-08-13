<script>
	import {
		Table,
		DialogModal,
		Plotter,
		Menu,
		ColumnTypes,
		SlideFullScreen,
		BasicSelect,
		Level,
		PredictiveInput
	} from '../lib/index.js';
	import { onMount } from 'svelte';

	let selectedValue = '';

	let dataTest = [
		{ checsk: false, name: '33112321', datas: 'sdasdsad' },
		{ checsk: true, name: '232322', datas: 'this es field test' },
		{ checsk: true, name: 'ddfff', datas: 'este es un texto un poco mas largo' },
		{ checsk: true, name: 'kkhkññkjjhmamá', datas: 'Otro texto [verifiado]' }
	];

	let columns = {
		checsk: {
			label: 'ENABLED',
			decorator: { component: ColumnTypes.Boolean, props: { editInline: true } }
		},
		fecha: { label: 'CHECK', decorator: { component: ColumnTypes.DateTime } },
		fecha2: {
			label: 'CHECK2',
			decorator: { component: ColumnTypes.DateTime, props: { fromFormat: 'yyyy-MM-dd' } }
		},
		fecha3: { label: 'CHECK3', decorator: { component: ColumnTypes.DateTime } },
		name: { label: 'Nombre' }
	};
	let show = false;
	let requestData = {
		url: 'https://cat-fact.herokuapp.com/facts/random',
		params: { animal_type: 'cat', amount: 10 }
	};

	let RawDataTable = [
		{ fecha: new Date().toISOString(), fecha2: '2024-02-14', fecha3: '2024-02-14T10:00:00.000z' }
	];

	onMount(() => {});
</script>

<button
	on:click={() => {
		show = true;
	}}>Mostrar</button
>

<Level>
	<div slot="r05">Menu principal</div>
	<div slot="r04"><input class="input is-danger" type="button" label="sss" /></div>
	<div slot="r03"><input class="input" /></div>
	<div slot="r02">este es un texto</div>
	<div slot="r01"><input class="input" type="button" /></div>
</Level>

<BasicSelect></BasicSelect>

<PredictiveInput
	bind:selectedValue
	classInput="is-small"
	label="Opciones"
	classLabel="is-small"
	on:select={(p) => {
		console.log('selectedValue', selectedValue, p);
	}}
></PredictiveInput>

<Table bind:columns bind:RawDataTable={dataTest}></Table>
