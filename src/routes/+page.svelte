<script>
	import {
		Table,
		ColumnTypes,
		EditorCode,
		MenuMega,
		RESTTester,
		PredictiveInput,
		Modal,
		Notify,
		Notifications
	} from '../lib/index.js';
	import { onMount } from 'svelte';
	//import { jsonFootprint } from '../lib/Table/utils/utils.js';
	let not = new Notifications();

	not.push({ message: 'inicio', color: 'success', title: 'Inicio App' });
	let selectedValue = '1';

	let data_test = {
		auth: { selection: 1, basic: { username: 'ddddd' }, bearer: { token: 'DDDDDDDDDD' } },
		body: {
			selection: 0,
			json: {
				code: { sd: 12, dff: 77, rtt: 899 }
			},
			xml: {
				code: ''
			},
			text: {
				value: ''
			}
		}
	};

	let menujson = {
		start: [
			{ label: 'PRUEBA', icon: ' fa-solid fa-delete-left ', link: '/ffsfffs/fff' },
			{ component: bt1 },
			{
				label: 'SEgundo',
				onclick: () => {
					console.log('Evento externo');
				}
			},
			{ component: tab1 },
			{
				label: 'MENU',
				icon: 'fa-solid fa-delete-left',
				submenu: [{ label: 'ggggg' }, { divider: true }, { label: 'TTgh' }]
			},
			{
				label: 'GRANDE',
				submenu: {
					columns: [
						{ title: 'Titulo', items: [{ label: 1212 }, { label: 22 }] },
						{ title: 'Otra opción', items: [{ label: 1212 }, { label: 22 }, { component: tab1 }] }
					],
					footer: { left: { label: 'GGGG' }, right: { label: 'sdsdsdyyyy' } }
				}
			}
		],
		brand: [{ label: 'ddddddd' }],
		end: [{ label: 'tab1' }, { component: user }]
	};

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

	//let code = `SELECT IdLog, DateLog, TipoMensaje, Topico, Mensaje, UserId, GETDATE() AS fecha_descarga  FROM [EasygestionEmpresarial].[dbo].[Log] WITH(NOLOCK) WHERE topico = 'Portal' AND datelog >= DATEADD(DAY, -30, datelog)`;
	let code = {
		wsdl: 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL',
		BasicAuthSecurity: {
			User: 'any',
			Password: 'any'
		}
	};
	let json02 = {
		a: 90,
		b: { c: { j: { h: 12, y: 'sdf' } } }
	};

	let dataTest = [
		{ checsk: false, name: 'name', datas: 'datas', fecha: 'fecha incorrecta', fecha3: 233 },
		{ checsk: false, name: '33112321', datas: 'Fecha en texto', fecha: '2024-08-13T16:55:13' },
		{
			checsk: true,
			name: '232322',
			datas: 'Fecha en toISOString',
			fecha: new Date().toISOString()
		},
		{
			checsk: true,
			name: 'kkhkññkjjhmamá',
			datas: 'Otro texto [verifiado]',
			fecha3: 'fecha 3'
		},
		{
			checsk: true,
			name: 'fecha en formtao texto',
			datas: '12.988',
			fecha: '2024-08-13T16:22:02.449',
			fecha3: 'Ultima fila.'
		}
	];

	let columns = {
		fecha: {
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

	let freeTyping = false;

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

	let mostrar = false;

	/*
	let tab_list = [
		{ label: 'UNO', component: tab2, classIcon : '' },
		{ label: 'DOS',  component: tab1, classIcon: "" },
		{ label: 'TRES', component: tab3,  classIcon: "" },
		{ label: 'CUATRO', disabled: true, component: tab4 }
	];
	let active_tab = 2;
	*/

	onMount(() => {});

	let valor = {};

	let lang = 'json';

	setTimeout(() => {
		code = { aa: 898, sss: 12, ddd: 90, ddd: { dd: 90, ddd: 90, kk: { ee: 77, q: 'dddd' } } };
		console.log('Cambia de codigo');
	}, 10000);

	setTimeout(() => {
		//	code = '{"dd": 4, "dtt": 788, "sss": {"dd": 78}}';
	}, 10000);
</script>

{#snippet user()}
	<span class="icon-text">
		<span class="icon">
			<i class="fa-solid fa-user"></i>
		</span>
		<span>User</span>
	</span>
{/snippet}

{#snippet tab1()}
	<button
		aria-label="close"
		class="button is-small"
		title="Delete row"
		onclick={() => {
			console.log('Boton...');
		}}
	>
		<span class="icon">
			<i class="fa-solid fa-trash"></i>
		</span>
	</button>
{/snippet}

<!--
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

<!-- <button
	on:click={() => {
		show = true;
		active_tab = 1;
	}}>Mostrar</button
>
 -->

<button
	onclick={() => {
		freeTyping = !freeTyping;
		console.log('freeTyping', freeTyping);
	}}>Cambiar</button
>

<button
	onclick={() => {
		mostrar = !mostrar;
		console.log('Mostrar', freeTyping);
	}}>Mostrar</button
>

{#if mostrar}
	<PredictiveInput
		bind:selectedValue
		label="SELECT"
		{freeTyping}
		classInput="is-small"
		classLabel="is-small"
		onselect={(p) => {
			console.log('selectedValue', selectedValue, p);
		}}
	></PredictiveInput>
	TENGO A DIOS, TENGO PAZ, TENGO FE DE MAS, LO QUE EL MUNDO NO ME DA...
{/if}

<!-- 
 -->

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
{/snippet}

{#if mostrar}
	<EditorCode
		left={l}
		right={r}
		bind:code
		bind:lang
		showResetButton={true}
		isReadOnly={false}
		showFormat={true}
		showCode={true}
		showHiddenButton={true}
		showSelectLang={true}
		onchange={(c) => {
			console.log(' EditorCode >>>> ', c, code);
		}}
	></EditorCode>
{/if}

<!-- 
 <RESTTester
	bind:data={data_test}
	methodDisabled={true}
	onchange={(data) => {
		console.trace('RESTTester change: ', data);
	}}
></RESTTester>
 
 -->

{#snippet bt1()}
	<button class="button is-dark">Dark</button>
{/snippet}
<button class="button is-dark">Dark</button>
<MenuMega brand={menujson.brand} start={menujson.start} end={menujson.end}></MenuMega>

<Notify></Notify>

<Modal show={true}><div class="box">Hola mundo</div></Modal>

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
	{requestData}
	showDeleteButton={true}
	showNewButton={true}
	showEditButton={true}
	left_items={[chao]}
	right_items={[rt1, rt2, rt3, pepe, chavo]}
>
	{#snippet rt1()}
		<div class="field has-addons has-addons-centered">
			<span class="control">
				<input class="input is-small" type="datetime-local" placeholder="Start" />
			</span>
			<span class="control">
				<a class="button is-static is-small"> Start </a>
			</span>
		</div>
	{/snippet}

	{#snippet rt2()}
		<div class="field has-addons has-addons-centered">
			<span class="control">
				<input class="input is-small" type="datetime-local" placeholder="Start" />
			</span>
			<span class="control">
				<a class="button is-static is-small"> End </a>
			</span>
		</div>
	{/snippet}

	{#snippet rt3()}
		<div class="field has-addons has-addons-centered">
			<span class="control">
				<input class="input is-small" type="number" placeholder="Limit" />
			</span>
			<span class="control">
				<a class="button is-static is-small"> Limit </a>
			</span>
		</div>
	{/snippet}

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

<style>
</style>
