<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, Table } from '../index.js';
	import Query from './key_value/kv.svelte';
	import Headers from './key_value/kv.svelte';
	import Auth from './auth.svelte';
	import Body from './body.svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import JSONView from '../JSONView/index.svelte';
	//	import { equalObjs } from '../class/utils.js';

	let {
		url = $bindable(),
		method = $bindable('GET'),
		limitSizeResponseView = $bindable(20000),
		methodDisabled = $bindable(false),
		data = $bindable({ query: [], headers: [], auth: {}, body: {} }),
		onchange = () => {}
	} = $props();

	let uF = new uFetch();
	let last_response = $state();
	let time_responde = $state();
	let response_as = $state('json');
	let active_tab = $state(0);
	let data_result = $state('');
	let running = $state(false);
	let sizeKBResponse = $state(0);

	let methods = [
		{ method: 'CONNECT', label: 'CONNECT' },
		{ method: 'DELETE', label: 'DELETE' },
		{ method: 'GET', label: 'GET' },
		{ method: 'HEAD', label: 'HEAD' },
		{ method: 'OPTIONS', label: 'OPTIONS' },
		{ method: 'POST', label: 'POST' },
		{ method: 'PATCH', label: 'PATCH' },
		{ method: 'PUT', label: 'PUT' },
		{ method: 'TRACE', label: 'TRACE' }
	];

	let responses_as = [
		{ as: 'json', label: 'JSON' },
		{ as: 'datatable', label: 'Table' },
		{ as: 'text', label: 'Text' }
	];

	let tabList = $state([
		{ label: 'Query Parameters', isActive: true, component: tab_query },
		{ label: 'HTTP Headers', component: tab_headers },
		{ label: 'Auth', component: tab_auth },
		{ label: 'Body', component: tab_body },
		{ label: 'Result', component: tab_result }
	]);

	let last_data = $state();
	let timeoutChangeData;

	$effect(() => {
		if (data || url || method) {
			//			console.log('>>>>>>>', data);
			clearTimeout(timeoutChangeData);
			timeoutChangeData = setTimeout(() => {
				internalOnChange();
			}, 750);
		}
	});

	function internalOnChange() {
		//	last_data = {...data};
		onchange({
			data: $state.snapshot(data),
			url: $state.snapshot(url),
			method: $state.snapshot(method)
		});
	}

	function defaultValues() {
		if (data == null) {
			data = {};
		}

		if (data && data.auth == null) {
			data.auth = { selection: 0 };
		}

		if (data && data.auth && data.auth.selection == null) {
			data.auth.selection = 0;
		}

		if (data && data.body == null) {
			data.body = { selection: 0 };
		}

		if (data && data.body && data.body.selection == null) {
			data.body.selection = 0;
		}

		if (data && data.query == null) {
			data.query = {};
		}

		if (data && data.headers == null) {
			data.headers = {};
		}
		//console.log('>>>>>>> ', data);
	}

	function getSizeJSON(data) {
		// Convertimos el JSON a una cadena
		const jsonString = JSON.stringify(data);
		return getSizeString(jsonString);
	}

	function getSizeString(text) {
		// Calculamos el tamaño en bytes
		const sizeInBytes = new TextEncoder().encode(text).length;

		// Convertimos a kilobytes
		const sizeInKB = (sizeInBytes / 1024).toFixed(4);
		return sizeInKB;
	}

	// Función para descargar el archivo
	function downloadFile(text, file_name, type = 'text/plain') {
		// Crear un blob con el contenido
		const blob = new Blob([text], { type: type });
		// Crear una URL para el blob
		const url = URL.createObjectURL(blob);

		// Crear un elemento <a> para iniciar la descarga
		const a = document.createElement('a');
		a.href = url;
		a.download = file_name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Liberar la URL
		URL.revokeObjectURL(url);
	}

	function resetResponse() {
		last_response = {};
		data_result = undefined;
		time_responde = undefined;
	}

	function getDataBody() {
		let dataBody;
		console.log('getDataBody > ', data.body);
		switch (data.body.selection) {
			case 0:
				try {
					let jsoncode = data?.body?.json?.code ?? undefined;
					console.log('jsoncode >> ', jsoncode);
					if (typeof jsoncode == 'object') {
						dataBody = jsoncode;
					} else {
						dataBody = JSON.parse(jsoncode);
					}
				} catch (error) {
					console.warn(error);
					dataBody = {};
				}
				break;

			default:
				dataBody = undefined;
				break;
		}

		return dataBody;
	}

	function getDataHeaders(data_table) {
		let result = {};
		//		console.log(data_table);
		if (data_table && Array.isArray(data_table)) {
			for (let i = 0; i < data_table.length; i++) {
				if (data_table[i].enabled && data_table[i].key && data_table[i].key.length > 0) {
					result[data_table[i].key] = data_table[i].value;
				}
			}
		}

		return result;
	}

	function getDataQuery(data_table) {
		let result = {};
		//		console.log(data_table);
		if (data_table && Array.isArray(data_table)) {
			for (let i = 0; i < data_table.length; i++) {
				if (data_table[i].enabled && data_table[i].key && data_table[i].key.length > 0) {
					result[data_table[i].key] = data_table[i].value;
				}
			}
		}

		return result;
	}

	onMount(() => {
		defaultValues();
	});

	onDestroy(() => {
		clearTimeout(timeoutChangeData);
	});
</script>

{#snippet tab_query()}
	{#if data != null}
		<Query
			bind:data={data.query}
			onchange={() => {
				internalOnChange();
			}}
		></Query>
	{/if}
{/snippet}

{#snippet tab_headers()}
	{#if data != null}
		<Headers
			bind:data={data.headers}
			onchange={() => {
				internalOnChange();
			}}
		></Headers>
	{/if}
{/snippet}

{#snippet tab_auth()}
	{#if data != null}
		<Auth
			bind:data={data.auth}
			onchange={() => {
				console.log(data);
				internalOnChange();
			}}
		></Auth>
	{/if}
{/snippet}

{#snippet tab_body()}
	{#if data}
		<Body
			bind:data={data.body}
			onchange={() => {
				console.log('tab_body cambia', data.body);
				internalOnChange();
			}}
		></Body>
	{/if}
{/snippet}

{#snippet tab_result()}
	<div class="field is-grouped is-grouped-multiline">
		<div class="control">
			<div class="tags has-addons">
				<span class="tag {last_response && last_response.ok ? 'is-success' : 'is-danger'}"
					>Status</span
				>
				{#if last_response && last_response.status}
					<span class="tag">{last_response.status}</span>
				{:else}
					<span class="tag"></span>
				{/if}
			</div>
		</div>

		<div class="control">
			<div class="tags has-addons">
				<span class="tag {last_response && last_response.ok ? 'is-success' : 'is-dark'}"
					>Status Text</span
				>
				{#if last_response && last_response.statusText}
					<span class="tag">{last_response.statusText}</span>
				{:else}
					<span class="tag"> </span>
				{/if}
			</div>
		</div>

		<div class="control">
			<div class="tags has-addons">
				<span class="tag {last_response && last_response.ok ? 'is-success' : 'is-dark'}">Ok</span>
				{#if last_response && last_response.ok}
					<span class="tag">{last_response.ok}</span>
				{:else}
					<span class="tag"></span>
				{/if}
			</div>
		</div>

		<div class="control">
			<div class="tags has-addons">
				<span class="tag is-dark">Time</span>
				{#if time_responde}
					<span class="tag">{time_responde} ms</span>
				{:else}
					<span class="tag"> ms </span>
				{/if}
			</div>
		</div>

		<div class="control">
			<div class="tags has-addons">
				<span class="tag {sizeKBResponse > limitSizeResponseView ? 'is-danger' : 'is-dark'}  "
					>Size</span
				>
				{#if sizeKBResponse}
					<span class="tag">{sizeKBResponse} KB</span>
				{:else}
					<span class="tag"> KB </span>
				{/if}
			</div>
		</div>
	</div>
	<div>
		{#if Number(sizeKBResponse) < Number(limitSizeResponseView)}
			{#if last_response && !last_response.ok && data_result}
				<JSONView bind:jsonObject={data_result}></JSONView>
			{:else if response_as == 'json' && data_result}
				<JSONView bind:jsonObject={data_result}></JSONView>
			{:else if response_as == 'text' && data_result}
				<code>
					{data_result}
				</code>
			{:else if response_as == 'datatable' && data_result}
				<Table bind:RawDataTable={data_result}></Table>
			{/if}
		{:else}
			<div class="container is-max-tablet is-small">
				<p class="block">
					The response exceeds {limitSizeResponseView} KB, it cannot be displayed in the view.
				</p>

				<div class="is-align-content-center">
					<button
						class="button is-link is-outlined is-small"
						onclick={() => {
							if (response_as == 'json') {
								downloadFile(JSON.stringify(data_result), 'response.json', 'text/json');
							} else if (response_as == 'text') {
								downloadFile(data_result, 'response.txt', 'text/plain');
							}
						}}>Download</button
					>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

<div class="block block_marg">
	<!-- Main container -->

	<div class="columns">
		<div class="column is-half">
			<div class="field has-addons">
				<p class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> Url </a>
				</p>
				<p class="control is-expanded">
					<input
						class="input is-small is-expanded"
						type="text"
						placeholder="URL"
						bind:value={url}
					/>
				</p>
			</div>
		</div>

		<div class="column">
			<nav class="level">
				<!-- Right side -->
				<div class="level-right">
					<span class="level-item">
						<div class="field has-addons">
							<p class="control">
								<button class="button is-static is-small"> Method: </button>
							</p>

							<p class="control">
								<span class="select is-small">
									<select bind:value={method} disabled={methodDisabled}>
										{#each methods as m}
											<option value={m.method}>{m.label}</option>
										{/each}
									</select>
								</span>
							</p>
						</div>
					</span>
					<span class="level-item">
						<div class="field has-addons">
							<p class="control">
								<button class="button is-static is-small"> Show as: </button>
							</p>

							<p class="control">
								<span class="select is-small">
									<select bind:value={response_as}>
										{#each responses_as as ras}
											<option value={ras.as}>{ras.label}</option>
										{/each}
									</select>
								</span>
							</p>
						</div>
					</span>
					<span class="level-item">
						<button
							class="button is-success is-small is-outlined"
							onclick={async () => {
								active_tab = 4;

								if (!running) {
									running = true;
									let data_send = {};

									//	console.log('METHOD: ', method);

									try {
										if (
											method == 'GET' ||
											method == 'HEAD' ||
											method == 'OPTIONS' ||
											method == 'CONNECT' ||
											method == 'TRACE'
										) {
											data_send = getDataQuery(data.query);
										} else if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
											// Pueden tener tanto query como body
											// Preferir body en lugar de query
											//console.log('>>>>>>>', data.body);
											let bodyData = getDataBody();

											if (bodyData) {
												data_send = bodyData;
											} else {
												data_send = getDataQuery(data.query);
											}
										}

										//console.log(data_send, url, method);
										resetResponse();
										// Capturamos el tiempo inicial
										let startTime = Date.now();

										//let headers = {"access-control-expose-headers": "Content-Disposition", "access-control-allow-headers": "Authorization"}

										//console.log(data);

										last_response = await uF[method]({
											url: url,
											data: data_send,
											headers: getDataHeaders(data.headers)
										});

										//last_response.headers.add("Access-Control-Expose-Headers","Authorization")

										// Capturamos el tiempo final
										let endTime = Date.now();

										// Calculamos la diferencia en milisegundos
										time_responde = endTime - startTime;

										console.warn(last_response);

										// TODO: probar cuando el dato es text pero en el editor se usa JSON, hay una excepción que no está controlada y el editor deja de funcionat

										if (last_response.ok) {
											switch (response_as) {
												case 'json':
													data_result = await last_response.json();
													sizeKBResponse = getSizeJSON(data_result);
													break;
												case 'text':
													data_result = await last_response.text();
													break;
												case 'datatable':
													data_result = await last_response.json();
													sizeKBResponse = getSizeJSON(data_result);
													break;
												default:
													data_result = '';
													sizeKBResponse = -1;
													break;
											}

											//console.log(last_response, data_result);
										} else {
											data_result = await last_response.json();
										}
									} catch (error) {
										running = false;
										console.error(error);
										data_result = error;
										alert(error);
									}

									running = false;
								} else {
									alert('There is an execution in progress');
								}
							}}
						>
							<span class="icon is-small">
								{#if running}
									<i class="fa-solid fa-cog fa-spin"></i>
								{:else}
									<i class="fa-solid fa-play"></i>
								{/if}
							</span>
							<span>Execute</span>
						</button>
					</span>
				</div>
			</nav>
		</div>
	</div>

	<Tab
		bind:tabs={tabList}
		bind:active={active_tab}
		onselect={(s) => {
			//	console.log('----->>>>>>>>>>>>>>>>', s);
			defaultValues();
		}}
	></Tab>
</div>

<style>
	.block_marg {
		margin: 0.25em;
	}
</style>
