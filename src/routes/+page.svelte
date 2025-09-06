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
		Notifications,
		FileUpload,
		EditorContent,
		Tab, Input, MenuSide, BasicSelect, Chat
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

	let  isoDate = "2025-01-29T19:04:00.000Z";

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

let row = {};

	let docs = {
		time: 1742007989316,
		blocks: [
			{
				id: 'qomiKhnfSk',
				type: 'header',
				data: {
					text: `Application: `,
					level: 2
				}
			},
			{
				id: 'oKtRnOC0U1',
				type: 'paragraph',
				data: {
					text: `Environment: `
				}
			},
			{
				id: 'RtXfAPnL5s',
				type: 'paragraph',
				data: {
					text: `Method: `
				}
			},
			{
				id: 'EAQyNTovro',
				type: 'paragraph',
				data: {
					text: `Handler:`
				}
			}
		],
		version: '2.31.0-rc.7'
	};

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

<Chat></Chat>


<BasicSelect label="Selecciona una opción"></BasicSelect>

<Input
	placeholder="Escribe algo..."
	bind:value={valor}
	lang={lang}
	onchange={(e) => {
		console.log('Valor cambiado', e);
	}}></Input>

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




{#snippet bt1()}
	<button class="button is-dark">Dark</button>
{/snippet}
<button class="button is-dark">Dark</button>


<Notify></Notify>

<style>
</style>
