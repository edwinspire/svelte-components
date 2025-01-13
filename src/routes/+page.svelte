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
		PredictiveInput,
		EditorCode,
		Tab,
		RESTTester
	} from '../lib/index.js';
	import { onMount } from 'svelte';
	//import { jsonFootprint } from '../lib/Table/utils/utils.js';

	let selectedValue = '';
	let mostrar_dialogo = true;
	let json01 = {
		a: 90,
		b: { c: { j: { h: 12, y: 'sdfa' } } }
	};

	let menu = {
		root: {
			left: [
				{
					type: 'image',
					img: '/image.png'
				},
				{
					type: 'link',
					label: 'Item 01',
					url: '/page01.html'
				},
				{
					type: 'menu',
					label: 'List',
					submenu: [
						{
							type: 'link',
							label: 'House',
							url: '/myhouse.html'
						},
						{
							type: 'link',
							label: 'Batroom',
							url: '/room.html'
						},
						{
							type: 'menu',
							label: 'Rooms',
							submenu: [
								{
									type: 'link',
									label: 'Pet',
									url: '/pet.html'
								},
								{
									type: 'link',
									label: 'Shop',
									url: '/shop.html'
								}
							]
						}
					]
				}
			]
		},
		rigth: [
			{
				type: 'label',
				label: 'My Name'
			},
			{
				type: 'link',
				label: 'Logout'
			}
		]
	};

	let code = {
		database: 'msdb',
		username: 'sa',
		password: 'sqlkarma',
		options: { host: '192.168.138.30', dialect: 'mssql', encrypt: false }
	};
	let json02 = {
		a: 90,
		b: { c: { j: { h: 12, y: 'sdf' } } }
	};

	let dataTest = [
		{ checsk: false, name: 'name', datas: 'datas', fecha: 'fecha', fecha3: 233 },
		{ checsk: false, name: '33112321', datas: 'sdasdsad', fecha: '2024-08-13T16:55:13' },
		{ checsk: true, name: '232322', datas: 'this es field test', fecha: new Date().toISOString() },
		{
			checsk: true,
			name: 'kkhkññkjjhmamá',
			datas: 'Otro texto [verifiado]',
			fecha3: 'fecha 3'
		},
		{
			checsk: true,
			name: 'ddfff',
			datas: '12.988',
			fecha: '2024-08-13T16:22:02.449',
			fecha3: 'Ultima fila.'
		}
	];

	let columns = {
		createdAt: {
			label: 'FECHA',
			decorator: {
				component: ColumnTypes.DateTime,
				props: { editInline: true, HighlightIsntToday: true }
			}
		},
		name: {
			label: 'Nombre',
			decorator: { component: ColumnTypes.Auto, props: { editInline: true } }
		},
		deleted: {
			label: 'DELETED',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					custom: {
						ontrue: { label: '' },
						onfalse: { css_cell: ' has-text-centered has-background-danger' }
					},
					editInline: true,
					onclick_cell: () => {
						console.log('Se ha pasado un click');
					}
				}
			}
		},
		text: {
			label: 'datasz',
			decorator: { component: ColumnTypes.TextLimit, props: { editInline: true } }
		}
	};
	let show = false;
	let requestData = {
		url: 'https://api.escuelajs.co/api/v1/products',
		params: { animal_type: 'cat', amount: 100 }
	};

	let RawDataTable = [
		{
			fecha: new Date().toISOString(),
			fechax: new Date(),
			fecha2: '2024-02-14',
			fecha3: '2024-02-14T10:00:00.000z',
			check: true,
			numero: 102.89,
			json: { hola: 34, ggd: 8, de: { er: 12, r: { rtr: 'df' }, arr: [344, 988] } }
		}
	];

	function generateRandomJson() {
		// Generar un valor booleano aleatorio
		const randomCheck = Math.random() >= 0.5;

		// Generar un número aleatorio y convertirlo en string
		const randomName = Math.floor(Math.random() * 100000000).toString();

		// Generar una cadena aleatoria
		const randomDatas = Math.random().toString(36).substring(2, 10);

		// Generar una fecha aleatoria dentro de un rango razonable
		const randomDate = new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toISOString();

		// Estructura JSON con valores aleatorios
		return {
			checsk: randomCheck,
			name: randomName,
			datas: randomDatas,
			fecha: randomDate
		};
	}

	/*
	let tab_list = [
		{ label: 'UNO', component: tab2, classIcon : '' },
		{ label: 'DOS',  component: tab1, classIcon: "" },
		{ label: 'TRES', component: tab3,  classIcon: "" },
		{ label: 'CUATRO', disabled: true, component: tab4 }
	];
	let active_tab = 2;
	*/

	onMount(() => {
		/*
		setInterval(() => {
			 dataTest.push(generateRandomJson());
		}, 500);
*/
	});

	let valor = 10;

	let lang = 'sql';

	setTimeout(() => {
		lang = 'xml';
	}, 30000);
	

	setTimeout(() => {
		code = 'SELECT * FROM BBB;';
	}, 10000);

</script>

<!-- {#snippet tab1()}
	1 <button aria-label="close" class="button is-small" title="Delete row">
		<span class="icon">
			<i class="fa-solid fa-trash"></i>
		</span>
	</button>
{/snippet}

{#snippet tab2()}
	2 <button aria-label="close" class="button is-small" title="Delete row">
		<span class="icon">
			<i class="fa-solid fa-trash"></i>
		</span>
	</button>
{/snippet}
{#snippet tab3()}
	3 <button aria-label="close" class="button is-small" title="Delete row">
		<span class="icon">
			<i class="fa-solid fa-trash"></i>
		</span>
	</button>
{/snippet}
{#snippet tab4()}
	4
	<button aria-label="close" class="button is-small" title="Delete row">
		<span class="icon">
			<i class="fa-solid fa-trash"></i>
		</span>
	</button>
{/snippet}

<Tab bind:tabs={tab_list} elements={[chavo, chavow]} bind:active={active_tab}>
	{#snippet chavo()}
		<button aria-label="close" class="button is-small" title="Delete row">
			<span class="icon">
				<i class="fa-solid fa-trash"></i>
			</span>
		</button>
	{/snippet}

	{#snippet chavow()}
		Boton
		<button aria-label="close" class="button is-small" title="Delete row">
			<span class="icon">
				<i class="fa-solid fa-trash"></i>
			</span>
		</button>
	{/snippet}
</Tab>
 -->
<!-- 
<Menu bind:menuData={menu}></Menu>
 -->
<!--  -->

<!-- 
 -->
<!-- 
<button
	on:click={() => {
		show = true;
		active_tab = 1;
	}}>Mostrar</button
>


<PredictiveInput
	bind:selectedValue
	classInput="is-small"
	label="Opciones"
	classLabel="is-small"
	on:select={(p) => {
		console.log('selectedValue', selectedValue, p);
	}}
></PredictiveInput>


 -->
 <Table
	onnewrow={() => {
		console.log(dataTest);
	}}
	oneditrow={(e) => {
		console.log('>>>> -> ', e);
	}}
	onclickrow={(x) => {
		console.log(x);
	}}
	{columns}
 requestData={requestData}
	ShowDeleteButton={true}
	ShowNewButton={true}
	ShowEditButton={true}
	left_items={[chao]}
	right_items={[pepe, chavo]}
>
	{#snippet chao()}
		chao
	{/snippet}

	{#snippet pepe()}
		<button aria-label="close" class="button is-small" title="Delete row">
			<span class="icon">
				<i class="fa-solid fa-trash"></i>
			</span>
		</button>
	{/snippet}

	{#snippet chavo()}
		<button aria-label="close" class="button is-small" title="Delete row">
			<span class="icon">
				<i class="fa-solid fa-trash"></i>
			</span>
		</button>
	{/snippet}
</Table>
 
<!-- 
<DialogModal bind:Show={mostrar_dialogo}><span class="label is-small" slot="title">Alerta</span></DialogModal>	|	 -->

<!-- <Level left={[chao, MPrincipal, B1]} right={[r1]}>
	{#snippet chao()}
		chao
	{/snippet}

	{#snippet MPrincipal()}
		Menu principal
	{/snippet}

	{#snippet B1()}
		<input class="input is-danger" type="button" label="sss" bind:value={valor} />
	{/snippet}

	{#snippet r1()}
	<input class="input is-danger" type="button" label="sss" bind:value={valor} />
{/snippet}
	
</Level>
 -->
{#snippet l()}
	Hola
{/snippet}

{#snippet r()}
	chao
{/snippet}<!-- 

 <EditorCode
	left={l}
	right={r}
	bind:code
	bind:lang={lang}
	showResetButton={true}
	isReadOnly={false}
	showFormat={true}
	showCode={true}
	showHiddenButton={true}
	showSelectLang={true}
	onchange={(code)=>{
console.log(code);
	}}
></EditorCode>
  -->
<!-- 
<RESTTester
	onchange={(data) => {
		console.log('RESTTester: ', data);
	}}
></RESTTester>
 -->
