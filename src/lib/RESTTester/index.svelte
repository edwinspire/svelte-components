<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, Table } from '../index.js';
	import Query from './key_value/kv.svelte';
	import Headers from './key_value/kv.svelte';
	import Auth from './auth.svelte';
	import Body from './body.svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import JSONView from '../JSONView/index.svelte';

	let {
		url = $bindable(''),
		method = $bindable('GET'),
		limitSizeResponseView = $bindable(20000),
		methodDisabled = $bindable(false),
		data = $bindable({
			query: [
				{
					enabled: true,
					key: '',
					value: ''
				}
			],
			body: {
				selection: 0,
				js: {},
				xml: {
					code: ''
				},
				text: {},
				json: {
					code: {}
				},
				form: {}
			},
			headers: [
				{
					enabled: false,
					key: '',
					value: ''
				}
			],
			auth: {
				selection: 0,
				basic: {},
				bearer: {}
			}
		}),
		onchange = () => {}
	} = $props();

	let uF = new uFetch();
	let last_response = $state();
	let time_responde = $state();
	let response_as = $state('json');
	let active_tab = $state(0);
	let data_result = $state({ data: '', MimeType: '', sizeKBResponse: -1 });
	let running = $state(false);
	//	let sizeKBResponse = $state(0);

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

	let last_data = '';
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

	/**
	 * Extrae solo el tipo MIME principal del encabezado 'Content-Type'.
	 * @param {Response} response - El objeto Response de una llamada fetch.
	 * @returns {string|null} El tipo MIME (ej: "application/json") o null si no se encuentra.
	 */
	function getMimeType(response) {
		const contentType = response.headers.get('Content-Type');

		if (!contentType) {
			return null;
		}

		// El tipo MIME es la parte que viene antes del primer punto y coma (;)
		// Usamos .split() para dividir la cadena y tomamos el primer elemento.
		// .trim() elimina espacios en blanco al inicio o al final.
		return contentType.split(';')[0].trim();
	}

	function internalOnChange() {
		//	last_data = {...data};
		const data_to_emit = {
			data: { ...data },
			url: $state.snapshot(url),
			method: $state.snapshot(method),
			last_response: data_result
		};

		let new_data = JSON.stringify(data_to_emit);

		if (new_data !== last_data) {
			last_data = new_data;
			//alert('dddd');
			//console.log(new_data);
			onchange(data_to_emit);
		}
	}

	function defaultValues() {
		if (data == null) {
			data = { query: [], headers: [], auth: { selection: 0 }, body: {} };
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

		if (!method) {
			method = 'GET';
		}

		if (!url) {
			url = '';
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
		data_result = { data: '', MimeType: '', sizeKBResponse: -1 };
		time_responde = undefined;
	}

	/**
	 * Obtiene el tamaño de la respuesta en kilobytes (KB) desde el header Content-Length.
	 * @param {Response} response - El objeto Response de fetch.
	 * @returns {number|null} El tamaño en KB (redondeado a 2 decimales) o null si no se puede obtener.
	 */
	function getResponseSizeInKB(response) {
		const contentLength = response.headers.get('Content-Length');

		if (!contentLength) {
			return null;
		}

		const bytes = parseInt(contentLength, 10);

		if (isNaN(bytes)) {
			return null;
		}

		return (bytes / 1024).toFixed(2); // Redondea a 2 decimales
	}

	function getDataBody() {
		let dataBody;
		//console.log('getDataBody > ', data.body);

		switch (data.body.selection) {
			case 0:
				try {
					let jsoncode = data?.body?.json?.code ?? undefined;
					//	console.log('jsoncode >> ', jsoncode);
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
			case 3:
				dataBody = data.body.form;
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
	{#if data?.query != null}
		<svelte:boundary onerror={(e) => console.error(e)}>
			<Query
				bind:data={data.query}
				onchange={() => {
					internalOnChange();
				}}
			></Query>

			{#snippet failed(error)}
				<div>
					<span class="icon-text">
						<span class="icon has-text-warning">
							<i class="fa-solid fa-triangle-exclamation"></i>
						</span>
						<span>{error.message}</span>
					</span>
				</div>
			{/snippet}
		</svelte:boundary>
	{/if}
{/snippet}

{#snippet tab_headers()}
	{#if data?.headers != null}
		<svelte:boundary onerror={(e) => console.error(e)}>
			<Headers
				bind:data={data.headers}
				onchange={() => {
					internalOnChange();
				}}
			></Headers>
			{#snippet failed(error)}
				<div>
					<span class="icon-text">
						<span class="icon has-text-warning">
							<i class="fa-solid fa-triangle-exclamation"></i>
						</span>
						<span>{error.message}</span>
					</span>
				</div>
			{/snippet}
		</svelte:boundary>
	{/if}
{/snippet}

{#snippet tab_auth()}
	{#if data?.auth != null}
		<svelte:boundary onerror={(e) => console.error(e)}>
			<Auth
				bind:data={data.auth}
				onchange={() => {
					//	console.log(data);
					internalOnChange();
				}}
			></Auth>
			{#snippet failed(error)}
				<div>
					<span class="icon-text">
						<span class="icon has-text-warning">
							<i class="fa-solid fa-triangle-exclamation"></i>
						</span>
						<span>{error.message}</span>
					</span>
				</div>
			{/snippet}
		</svelte:boundary>
	{/if}
{/snippet}

{#snippet tab_body()}
	{#if data?.body != null}
		<svelte:boundary onerror={(e) => console.error(e)}>
			<Body
				bind:data={data.body}
				onchange={() => {
					//console.log('tab_body cambia', $state.snapshot(data.body));
					internalOnChange();
				}}
			></Body>

			{#snippet failed(error)}
				<div>
					<span class="icon-text">
						<span class="icon has-text-warning">
							<i class="fa-solid fa-triangle-exclamation"></i>
						</span>
						<span>{error.message}</span>
					</span>
				</div>
			{/snippet}
		</svelte:boundary>
	{/if}
{/snippet}

{#snippet tab_result()}
	<div class="field is-grouped is-grouped-multiline">
		<div class="control">
			<div class="tags has-addons">
				<span
					class="tag {last_response
						? last_response.ok === true
							? 'is-success'
							: 'is-danger'
						: 'is-dark'}">Status</span
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
				<span class="tag is-dark">MimeType</span>
				{#if data_result && data_result.MimeType}
					<span class="tag">{data_result.MimeType}</span>
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
				<span
					class="tag {data_result.sizeKBResponse > limitSizeResponseView
						? 'is-danger'
						: 'is-dark'}  ">Size</span
				>
				{#if data_result.sizeKBResponse}
					<span class="tag">{data_result.sizeKBResponse} KB</span>
				{:else}
					<span class="tag"> KB </span>
				{/if}
			</div>
		</div>
	</div>
	<div>
		{#if Number(data_result.sizeKBResponse) < Number(limitSizeResponseView)}
			{#if last_response && !last_response.ok && data_result.data}
				<JSONView bind:jsonObject={data_result.data}></JSONView>
			{:else if response_as == 'json' && data_result.data}
				<JSONView bind:jsonObject={data_result.data}></JSONView>
			{:else if response_as == 'text' && data_result.data}
				<code>
					{data_result.data}
				</code>
			{:else if response_as == 'datatable' && data_result.data}
				<Table bind:RawDataTable={data_result.data}></Table>
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
								downloadFile(JSON.stringify(data_result.data), 'response.json', 'text/json');
							} else if (response_as == 'text') {
								downloadFile(data_result.data, 'response.txt', 'text/plain');
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

									//	console.log(last_response);
									//	console.log('METHOD: ', method);

									if (url && url.length > 5) {
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

											//console.log('>>>>>>>>>> ', typeof data_send, url, method);
											resetResponse();
											// Capturamos el tiempo inicial
											let startTime = Date.now();

											//let headers = {"access-control-expose-headers": "Content-Disposition", "access-control-allow-headers": "Authorization"}

											if (
												data.auth &&
												data.auth.selection == 1 &&
												data.auth.basic.username &&
												data.auth.basic.password
											) {
												console.log(data.auth);
												uF.SetBasicAuthorization(
													data.auth.basic.username,
													data.auth.basic.password
												);
											}

											if (data.auth && data.auth.selection == 2 && data.auth.bearer.token) {
												console.log(data.auth);
												uF.setBearerAuthorization(data.auth.bearer.token);
											}

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
											data_result.MimeType = getMimeType(last_response);
											data_result.sizeKBResponse = getResponseSizeInKB(last_response);
											//	console.warn(last_response);

											// TODO: probar cuando el dato es text pero en el editor se usa JSON, hay una excepción que no está controlada y el editor deja de funcionat

											if (last_response.ok) {
												switch (response_as) {
													case 'json':
														data_result.data = await last_response.json();
														if (!data_result.sizeKBResponse) {
															data_result.sizeKBResponse = getSizeJSON(data_result.data);
														}

														break;
													case 'text':
														data_result.data = await last_response.text();
														if (!data_result.sizeKBResponse) {
															data_result.sizeKBResponse = getSizeString(data_result.data);
														}
														break;
													case 'datatable':
														data_result.data = await last_response.json();
														if (!data_result.sizeKBResponse) {
															data_result.sizeKBResponse = getSizeJSON(data_result);
														}
														break;
													default:
														data_result.data = '';
														data_result.sizeKBResponse = -1;
														break;
												}

												//console.log(last_response, data_result);
											} else {
												if (
													typeof data_result.MimeType === 'string' &&
													data_result.MimeType.toLowerCase().includes('json')
												) {
													data_result.data = await last_response.json();
												} else {
													data_result.data = await last_response.text();
												}

												if (!data_result.sizeKBResponse) {
													data_result.sizeKBResponse = getSizeJSON(data_result.data);
												}
											}
										} catch (error) {
											running = false;
											console.error(error);
											data_result.error = error;
											alert(error);
										}
									} else {
										alert('Url is empty');
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

	{#if data}
		<Tab
			bind:tabs={tabList}
			bind:active={active_tab}
			onselect={(s) => {
				//	console.log('----->>>>>>>>>>>>>>>>', s);
				defaultValues();
			}}
		></Tab>
	{:else}
		<div>
			<span class="icon-text">
				<span class="icon has-text-warning">
					<i class="fa-solid fa-triangle-exclamation"></i>
				</span>
				<span>There is no data to start.</span>
			</span>
		</div>
	{/if}
</div>

<style>
	.block_marg {
		margin: 0.25em;
	}
</style>
