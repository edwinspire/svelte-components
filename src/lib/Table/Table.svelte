<script>
	'use strict';
	//import { createEventDispatcher } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import { Auto } from './Column/DefaultTypes.js';
	import { storeChangedTables } from '../class/websocket.js';
	//import { sha256 } from '../class/sha.js';
	import Level from '../Level/Level.svelte';
	import { ExportTableToHTML, ExportTableToXlsx } from './utils/export_data.js';
	//import workerUrl from './utils/worker_process_rawdata.js?worker';

	//TODO Habilitar mostrar u ocultar columnas
	//TODO Fijar encabezado
	//TODO Hacer celdas editables
	//TODO Hacer columnas con ancho ajustable

	let {
		RawDataTable = $bindable(),
		SelectionType = 0,
		columns = $bindable({}),
		ShowNewButton = false,
		ShowEditButton = false,
		ShowSelectionButton = true,
		ShowExportButton = true,
		iconExport = 'fa-solid fa-file-excel',
		iconDeleteRow = 'fa-solid fa-trash',
		ShowDeleteButton = false,
		PageSize = [25, 50, 100, 200, 300, 500, 1000],
		PageSizeSelected = 0,
		relatedTablesForAutoRefresh = [],
		fileNameExport = '',
		requestData = $bindable(),
		rowClassFunction = function (row) {
			return '';
		},
		left_items,
		right_items,
		onclickrow = () => {},
		oneditrow = () => {},
		onnewrow = () => {},
		ondeleterow = () => {}
	} = $props();

	//export let RawDataTable = [];
	//export let SelectionType = 0;
	//export let columns = {};
	//export let ShowNewButton = false;
	//export let ShowEditButton = false;
	//export let ShowSelectionButton = true;
	//export let ShowExportButton = true;
	//export let iconExport = 'fa-solid fa-file-excel';
	//export let iconDeleteRow = 'fa-solid fa-trash';
	//export let ShowDeleteButton = false;
	//-- Pagination --//
	//export let PageSize = [25, 50, 100, 200, 300, 500, 1000];
	//export let PageSizeSelected = 0;
	//export let relatedTablesForAutoRefresh = [];
	// -- Nombre del archivo a exportar -- //
	//export let fileNameExport = '';
	/*
	export let requestData = {
		url: undefined,
		refresh_time: 4,
		params: undefined,
		method: 'GET',
		headers: undefined,
		authorization: { basic: undefined, bearer: undefined }
	};
*/
	/*
	export let rowClassFunction = function (row) {
		return '';
	};
*/

	const FetchData = new uFetch();
	//const dispatch = createEventDispatcher();
	let DataTable = $state([]);
	let SelectedRows = $state([]);

	let text_search = $state(undefined);
	let loading = $state(false);
	let showEdit = $state(false);
	let ColumnSort = $state();
	let ShowDialogColumn = $state(false);
	let timeRemainingToRefresh = $state(999);
	let LastFetchResponse = $state(true);
	// -- Refresh -- //
	let IntervalRefresh = [10, 20, 30, 45, 60, 120, 240, 480, 960, 1920, 3840];
	let PageSelected = $state(1);
	let totalFilteredRows = $state(0);
	let TotalPages = $state(0);
	let paginatedData = $state([]);

	let SelectAll = $state(false);
	let orderASC = $state(true);
	let internal_columns = $state({});

	// Crea el Worker
	let worker;

	//$: SelectedRows, OnSelection();
	//$: DataTable, RawDataTable, onrawDataChanged();
	//$: RawDataTable, onrawDataChanged();
	//$: columns, SetColumns();

	let idTimeoutDataChanged;

	function requestDataExists() {
		return requestData && requestData.url && requestData.url.length > 0;
	}

	function onrawDataChanged() {
		// console.log('>> onrawDataChanged >>', hash_last_data);

		if (RawDataTableIsArray()) {
			// Cancela el ultimo timeout
			clearTimeout(idTimeoutDataChanged);
			//console.log('xxxxxxxxxx');

			// Setea uno nuevo
			idTimeoutDataChanged = setTimeout(() => {
				try {
					if (worker) {
						let datamsg = {
							data: RawDataTable,
							columns: columns,
							hash_last_data: hash_last_data
						};

						worker.postMessage(JSON.stringify(datamsg));
					}
				} catch (error) {
					console.trace(error);
				}
			}, 500);
		}
	}

	function OnSelection() {
		//dispatch('selectrows', { rows: GetSelectedRows() });
		onselectrows({ rows: GetSelectedRows() });
	}

	onMount(() => {
		timeRemainingToRefresh = 0;

		if (!requestData) {
			requestData = {
				url: undefined,
				refresh_time: 4,
				params: undefined,
				method: 'GET',
				headers: undefined,
				authorization: { basic: undefined, bearer: undefined }
			};
		}

		requestData.method = requestData.method || 'GET';
		requestData.refresh_time = Number(requestData.refresh_time)
			? Number(requestData.refresh_time)
			: 4;

		worker = new Worker(new URL('./utils/worker_process_rawdata.js', import.meta.url), {
			type: 'module'
		});
		// Escuchar mensajes del Worker
		worker.onmessage = (event) => {
			//console.log('>>>>>>>>>>> ', event.data);

			hash_last_data = event.data.hash_last_data;

			if (event.data.different_data) {
				RawDataTable = event.data.data;
				//console.log('Hay cambos');
				SetColumns();
				FilterData();
			}

			//RawDataTable = u;
			//console.log(RawDataTable);
		};

		// Manejar errores del Worker
		worker.onerror = (error) => {
			console.error('Error en Worker:', error.message);
		};

		storeChangedTables.subscribe((value) => {
			//console.log('storeChangedTables.subscribe', value);

			try {
				if (relatedTablesForAutoRefresh.includes(value.table)) {
					auto_refresh_by_table_changed_request++;
				}
			} catch (error) {
				console.log(error);
			}
		});
	});

	function ArrayChunk(myArray, chunk_size) {
		//var index = 0;
		//var arrayLength = myArray.length;
		let tempArray = [];
		chunk_size = parseInt(chunk_size);

		if (myArray && Array.isArray(myArray)) {
			for (let index = 0; index < myArray.length; index += chunk_size) {
				let myChunk = myArray.slice(index, index + chunk_size);

				// Do something if you want with the group
				tempArray.push(myChunk);
			}
		}

		//tempArray[0] = myArray;
		return tempArray;
	}

	function SetColumns() {
		if (RawDataTableIsArray() && RawDataTable.length > 0) {
			let MaxSizeLabel = 15;
			internal_columns = {};

			Object.keys(RawDataTable[0]).forEach((item) => {
				//	console.log('Tabla: ', item);

				//let icolumn = {};
				if (item === 'internal_hash_row') {
					internal_columns[item] = {
						label: item.substring(0, MaxSizeLabel),
						hidden: true
					};
				} else if (columns[item]) {
					internal_columns[item] = columns[item];
					if (!internal_columns[item].label) {
						internal_columns[item].label = item.substring(0, MaxSizeLabel);
					}
				} else {
					// Tambien limita la longitud del nombre de la columna a 10 caracteres
					internal_columns[item] = {
						label: item.substring(0, MaxSizeLabel),
						hidden: false
					};
				}
				//return icolumn;
			});
		}
	}

	function RowIsSelected(internal_hash_row) {
		let isSelected = SelectedRows.includes(internal_hash_row);
		return isSelected;
	}

	export function GetSelectedRows() {
		let r = [];
		if (RawDataTableIsArray()) {
			r = RawDataTable.filter((row) => {
				return SelectedRows.includes(row.internal_hash_row);
			});
		}
		return r;
	}

	function ExportToHTML() {
		//console.log(this);
		try {
			// Filter only selection

			//	console.log('ExportTable > Columns ', columns);

			let filteredData = GetSelectedRows();
			if (filteredData && filteredData.length > 0) {
				ExportTableToHTML(filteredData, columns, fileNameExport);
			} else {
				SelectionType = 2;
				alert('Select the rows to export.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	function ExportToExcel() {
		//console.log(this);
		try {
			// Filter only selection

			//	console.log('ExportTable > Columns ', columns);

			let filteredData = GetSelectedRows();
			if (filteredData && filteredData.length > 0) {
				ExportTableToXlsx(filteredData, columns, fileNameExport);
			} else {
				SelectionType = 2;
				alert('Select the rows to export.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	function fnDeleteRows() {
		//console.log(this);
		try {
			// Filter only selection

			//	console.log('ExportTable > Columns ', columns);

			let filteredData = GetSelectedRows();
			if (filteredData && filteredData.length > 0) {
			} else {
				alert('Select the rows to delete.');
				SelectionType = 2;
			}
		} catch (error) {
			console.error(error);
		}
	}

	let auto_refresh_by_table_changed_request = 0;

	let auto_refresh = setInterval(async () => {
		//console.log('yyyyyyyyyyyy');
		if (requestDataExists()) {
			if (timeRemainingToRefresh == 0 || auto_refresh_by_table_changed_request > 0) {
				await GetDataTable();
				timeRemainingToRefresh = IntervalRefresh[requestData.refresh_time];
				auto_refresh_by_table_changed_request = 0;
			} else {
				timeRemainingToRefresh--;
			}
		}
	}, 1000);

	let hash_last_data = '';

	let check_changes_data = setInterval(async () => {
		onrawDataChanged();
	}, 750);

	onDestroy(() => {
		clearInterval(auto_refresh);
		//	clearInterval(check_changes_data);
		clearInterval(check_changes_data);
		if (worker) {
			worker.terminate();
		}
	});

	function ChangeIntervalRefresh() {
		if (requestDataExists()) {
			let i = requestData.refresh_time + 1;
			if (IntervalRefresh[i]) {
				requestData.refresh_time = i;
			} else {
				requestData.refresh_time = 0;
			}

			timeRemainingToRefresh = IntervalRefresh[requestData.refresh_time];
		} else {
			console.warn('ChangeIntervalRefresh: requestData not setted.');
		}
	}

	function SortColumn(key, order = 'asc') {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				return 0;
			}

			const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
			const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return order === 'desc' ? comparison * -1 : comparison;
		};
	}

	function HClickCell(cell, row) {
		//dispatch('clickrow', { field: cell, data: row });
		if (onclickrow) {
			onclickrow({ field: cell, data: row });
		}
	}

	function HClickEditRow(e) {
		//dispatch('editrow', { data: e });
		if (oneditrow) {
			oneditrow({ data: e });
		}
	}
	function HClickNew(e) {
		//dispatch('newrow', e);
		if (onnewrow) {
			onnewrow(e);
		}
	}

	function HClickDelete(e) {
		fnDeleteRows();
		//dispatch('deleterow', { rows: GetSelectedRows() });
		if (ondeleterow) {
			ondeleterow({ rows: GetSelectedRows() });
		}
	}

	function HClickHeader(e) {
		ColumnSort = e.target.dataset.column;
		orderASC = !orderASC;
		//console.log("ColumnSort:", ColumnSort, "orderASC:", orderASC);
		FilterData();
	}

	function handleClickSearch() {
		if (text_search && text_search.length > 0) {
			FilterData();
		} else {
			FilterData();
			timeRemainingToRefresh = 0;
		}
	}

	function handleChangeSelectAll(e) {
		SelectAll = e.target.checked;

		if (SelectAll) {
			SelectedRows = [];

			paginatedData.forEach((pag) => {
				SelectedRows = SelectedRows.concat(
					pag.map((item) => {
						return item.internal_hash_row;
					})
				);
			});
		} else {
			SelectedRows = [];
		}
		//console.log(SelectedRows);
		FilterData();
	}

	/*
	function handleExportSelection(e) {
		ExportTable();
	}
*/

	function RawDataTableIsArray() {
		return RawDataTable && Array.isArray(RawDataTable);
	}

	function FilterData() {
		//console.log("Filtrar", text_search);
		let TempData;
		if (text_search && text_search.length > 0 && RawDataTableIsArray()) {
			TempData = RawDataTable.filter((d) => {
				let s = Object.values(d).filter((item) => {
					if (item) {
						return item.toString().toUpperCase().includes(text_search.toUpperCase());
					} else {
						return item;
					}
				});
				if (s.length > 0) {
					return true;
				} else {
					return false;
				}
			});
		} else {
			TempData = RawDataTable;
		}

		if (TempData) {
			totalFilteredRows = TempData.length;
			Pagination(TempData);
		}
	}

	function Pagination(rows) {
		//console.log('Pagination 1 >>>>>>>> ', rows);

		if (ColumnSort) {
			if (orderASC) {
				rows = rows.sort(SortColumn(ColumnSort));
			} else {
				rows = rows.sort(SortColumn(ColumnSort, 'desc'));
			}
		}
		//console.log(PageSize, PageSizeSelected);
		//console.log('Pagination 2 >>>>>>>> ', rows);
		paginatedData = ArrayChunk(rows, PageSize[PageSizeSelected]);

		//console.log(paginatedData.length);

		TotalPages = paginatedData.length;
		if (PageSelected > TotalPages) {
			PageSelected = 1;
		}
		SelectPage();
	}

	function SelectPage() {
		let tmpdata = paginatedData[PageSelected - 1];

		if (tmpdata) {
			DataTable = tmpdata.filter((ev) => {
				// Se puso este filtro para evitar errores cuando hay registros nulos o no tengan internal_hash_row
				return ev && ev.internal_hash_row;
			});
			//console.log(tmpdata, DataTable);
		}
	}

	function HandleOnClickEdit() {
		//console.log(showEdit);
		showEdit = !showEdit;
		return false;
	}

	function HandleOnRowSelected(event) {
		if (SelectionType == 1) {
			SelectedRows = [];
		}

		let internal_hash_row = event.target.dataset.internal_hash_row;
		if (event.target.checked) {
			SelectedRows.push(internal_hash_row);
		} else {
			SelectedRows = SelectedRows.filter((value) => {
				return value !== internal_hash_row;
			});
		}
		OnSelection();
	}

	async function GetDataTable() {
		//console.log('GetDataTable');
		if (loading) {
			console.log('There is a petition in progress...');
		} else {
			if (requestDataExists()) {
				try {
					loading = true;

					if (requestData.authorization && requestData.authorization.bearer) {
						FetchData.setBearerAuthorization(requestData.authorization.bearer);
					} else if (requestData.authorization && requestData.authorization.basic) {
						FetchData.SetBasicAuthentication(
							requestData.authorization.basic.username,
							requestData.authorization.basic.password
						);
					} else {
						FetchData.ClearAuthorizationHeader();
					}

					let method_request =
						requestData && requestData.method ? requestData.method.toUpperCase() : 'GET';

					//		console.log(method_request);

					let res = await FetchData[method_request]({
						url: requestData.url,
						data: requestData.params,
						headers: requestData.headers
					});
					console.log('TABLE FetchData: ', res);
					if (res && res.status == 200) {
						let data = await res.json();

						if (Array.isArray(data)) {
							RawDataTable = data;
							LastFetchResponse = true;
						} else {
							console.warn(data);
							RawDataTable = [];
							LastFetchResponse = false;
						}
					} else {
						console.error(res);
						LastFetchResponse = false;
					}
					//ProcessRawData();
					loading = false;
				} catch (error) {
					console.error(error);
					loading = false;
					LastFetchResponse = false;
				}
			} else {
				console.warn('Not url asigned');
				LastFetchResponse = false;
			}
		}
	}
</script>

<Level
	left={left_items}
	right={[right_08, right_07, right_06, right_05, right_04, right_03, right_02, right_01]}
>
	{#snippet right_01()}
		<div class="field has-addons">
			<p class="control">
				<input
					class="input size_search is-small"
					type="text"
					placeholder="Search"
					bind:value={text_search}
				/>
			</p>
			<p class="control">
				<button aria-label="close" class="button is-small" onclick={handleClickSearch}>
					<span class="icon is-small">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</p>
		</div>
	{/snippet}

	{#snippet right_02()}
		{#if ShowExportButton}
			<button
				aria-label="close"
				class="button is-small"
				onclick={ExportToExcel}
				title="Export to Excel"
			>
				<span class="icon">
					<i class={iconExport}></i>
				</span>
			</button>
			<button
				aria-label="close"
				class="button is-small"
				onclick={ExportToHTML}
				title="Export to Html"
			>
				<span class="icon">
					<i class="fa-solid fa-download"></i>
				</span>
			</button>
		{/if}
	{/snippet}

	{#snippet right_03()}
		{#if ShowSelectionButton}
			<div class="dropdown is-hoverable is-right" title="Selection type">
				<div class="dropdown-trigger">
					<button
						aria-label="close"
						class="button is-small"
						aria-haspopup="true"
						aria-controls="dropdown-menu"
					>
						<span class="icon">
							<i class="far fa-list-alt"></i>
						</span>
					</button>
				</div>
				<div class="dropdown-menu" role="menu">
					<div class="dropdown-content">
						<!-- svelte-ignore a11y_missing_attribute -->
						<a class="dropdown-item is-size-7">
							<input
								class="check_margin"
								type="radio"
								name="selection_type"
								value="1"
								checked={SelectionType == 1 ? true : false}
								onchange={() => {
									SelectionType = 1;
								}}
							/>
							<span class="icon">
								<i class="fas fa-check"></i>
							</span>
							<span>Simple</span>
						</a>

						<!-- svelte-ignore a11y_missing_attribute -->
						<a class="dropdown-item is-size-7">
							<input
								class="check_margin"
								type="radio"
								name="selection_type"
								value="2"
								checked={SelectionType == 2 ? true : false}
								onchange={() => {
									SelectionType = 2;
								}}
							/>
							<span class="icon">
								<i class="fas fa-check-double"></i>
							</span>
							<span>Multiple</span>
						</a>
						<hr class="dropdown-divider" />

						<!-- svelte-ignore a11y_missing_attribute -->
						<a class="dropdown-item is-size-7">
							<input
								class="check_margin"
								type="radio"
								name="selection_type"
								value="0"
								checked={SelectionType == 0 ? true : false}
								onchange={() => {
									SelectionType = 0;
								}}
							/>

							<span class="icon">
								<i class="fas fa-ban"></i>
							</span>
							<span>None</span>
						</a>
					</div>
				</div>
			</div>
		{/if}
	{/snippet}

	{#snippet right_04()}
		{#if ShowDeleteButton}
			<button aria-label="close" class="button is-small" title="Delete row" onclick={HClickDelete}>
				<span class="icon">
					<i class={iconDeleteRow}></i>
				</span>
			</button>
		{/if}
	{/snippet}

	{#snippet right_05()}
		{#if ShowEditButton}
			<button aria-label="close" class="button is-small" onclick={HandleOnClickEdit}>
				<span class="icon">
					<i class="far fa-edit"></i>
				</span>
			</button>
		{/if}
	{/snippet}

	{#snippet right_06()}
		{#if ShowNewButton}
			<button aria-label="close" class="button is-small" onclick={HClickNew}>
				<span class="icon">
					<i class="far fa-file"></i>
				</span>
			</button>
		{/if}
	{/snippet}

	{#snippet right_07()}
		{#if requestData && requestData.url}
			<button class="button is-small" onclick={ChangeIntervalRefresh}>
				{#if loading}
					<span class="icon has-text-info"><i class="fas fa-spinner fa-pulse"></i></span>
				{:else if LastFetchResponse}
					<span class="icon"><i class="fas fa-hourglass-half"></i></span>
				{:else}
					<span class="icon has-text-danger"><i class="fas fa-exclamation-triangle"></i></span>
				{/if}
				<span>{timeRemainingToRefresh}s</span>
			</button>
		{/if}
	{/snippet}

	{#snippet right_08()}
		{#if Array.isArray(right_items)}
			{#each right_items as r_item}
				<span class="slot_padding">{@render r_item?.()}</span>
			{/each}
		{/if}
	{/snippet}
</Level>

{#if DataTable}
	<div class="table-container is-size-7">
		<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
			<!-- Aqui escribe el encabezado de la tabla -->
			<thead>
				<tr class="has-background-link-dark">
					<th class="has-text-centered has-text-white">#</th>
					{#if SelectionType == 1}
						<th class="has-text-centered has-text-white"><span>-</span></th>
					{:else if SelectionType == 2}
						<th class="has-text-centered has-text-white">
							<input type="checkbox" onclick={handleChangeSelectAll} />
						</th>
					{/if}

					{#if showEdit}
						<th class="has-text-centered has-text-white">
							<i class="fas fa-pen"></i>
						</th>
					{/if}

					{#if internal_columns}
						{#each Object.keys(internal_columns) as item, ith}
							<!-- Muestra las columnas que no se hayan especificado como ocultas -->
							{#if internal_columns[item]}
								{#if !internal_columns[item].hidden || !internal_columns[item].hidden == null}
									<!-- Mostramos label si es que existe -->
									<th
										class="has-text-centered show_cursor_mouse has-text-white"
										data-column={item}
										onclick={HClickHeader}
									>
										{internal_columns[item].label}
										{#if ColumnSort == item}
											{#if orderASC}
												<i class="fas fa-caret-down"></i>
											{:else}
												<i class="fas fa-caret-up"></i>
											{/if}
										{/if}
									</th>
								{/if}
							{/if}
						{/each}
					{/if}
				</tr>
			</thead>
			<tbody>
				{#if DataTable}
					{#each DataTable as dataRow, i (dataRow.internal_hash_row)}
						<tr class={rowClassFunction(dataRow)}>
							<td>{i + 1 + PageSize[PageSizeSelected] * (PageSelected - 1)}</td>

							{#if SelectionType == 1}
								<td class="has-text-centered"
									><input
										type="radio"
										name="single_select"
										class="show_cursor_mouse"
										checked={RowIsSelected(dataRow.internal_hash_row)}
										data-internal_hash_row={dataRow.internal_hash_row}
										onclick={HandleOnRowSelected}
									/></td
								>
							{:else if SelectionType == 2}
								<td class="has-text-centered">
									<input
										class="show_cursor_mouse"
										type="checkbox"
										checked={RowIsSelected(dataRow.internal_hash_row)}
										data-internal_hash_row={dataRow.internal_hash_row}
										onclick={HandleOnRowSelected}
									/>
								</td>
							{/if}

							{#if showEdit}
								<td class="has-text-centered show_cursor_mouse" onclick={HClickEditRow(dataRow)}>
									<span class="icon is-small">
										<i class="fas fa-pen"></i>
									</span>
								</td>
							{/if}

							{#each Object.keys(dataRow) as item, itd}
								<!-- Muestra las columnas que no se hayan especificado como ocultas -->
								{#if internal_columns[item]}
									{#if !internal_columns[item].hidden || internal_columns[item].hidden == null}
										{#if internal_columns[item].decorator && internal_columns[item].decorator.component}
											{@const Component = internal_columns[item].decorator.component}
											<Component
												onclick={(e) => {
													// console.log('HClickCell 1');
													// e.preventDefault();
													HClickCell(item, dataRow);
												}}
												{...internal_columns[item]?.decorator?.props}
												bind:row={DataTable[i]}
												bind:value={dataRow[item]}
											/>
										{:else}
											<Auto
												{...internal_columns[item]?.decorator?.props}
												bind:value={dataRow[item]}
												onclick={(e) => {
													// console.log('HClickCell 1');
													// e.preventDefault();
													HClickCell(item, dataRow);
												}}
											></Auto>
										{/if}
									{/if}
								{/if}
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	<div class="table_pagination">
		<!-- Main container -->
		<nav class="level">
			<!-- Left side -->
			<div class="level-left">
				{#if paginatedData && paginatedData.length > 1}
					<div class="level-item">
						<span class="">
							Page {PageSelected} of {TotalPages} (Total {totalFilteredRows}
							rows)
						</span>
					</div>
					<div class="level-item">
						<div class="buttons has-addons">
							<button
								aria-label="close"
								class="button is-small"
								onclick={() => {
									PageSelected = 1;
									SelectPage();
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-double-left"></i>
								</span>
							</button>
							<button
								aria-label="close"
								class="button is-small"
								onclick={() => {
									if (PageSelected > 1) {
										PageSelected = PageSelected - 1;
									}
									SelectPage();
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-left"></i>
								</span>
							</button>
							<button
								class="button is-small is-info"
								onclick={() => {
									//PageSelected = 1;
									SelectPage();
								}}>{PageSelected}</button
							>
							{#if PageSelected + 1 <= TotalPages}
								<button
									class="button is-small"
									onclick={() => {
										PageSelected = PageSelected + 1;
										SelectPage();
									}}>{PageSelected + 1}</button
								>
							{/if}
							{#if PageSelected + 2 <= TotalPages}
								<button
									class="button is-small"
									onclick={() => {
										PageSelected = PageSelected + 2;
										SelectPage();
									}}>{PageSelected + 2}</button
								>
							{/if}

							{#if PageSelected + 3 <= TotalPages}
								<button
									class="button is-small"
									onclick={() => {
										PageSelected = PageSelected + 3;
										SelectPage();
									}}>{PageSelected + 3}</button
								>
							{/if}

							{#if PageSelected + 4 <= TotalPages}
								<button
									class="button is-small"
									onclick={() => {
										PageSelected = PageSelected + 4;
										SelectPage();
									}}>{PageSelected + 4}</button
								>
							{/if}

							<button
								aria-label="close"
								class="button is-small"
								onclick={() => {
									if (PageSelected < TotalPages) {
										PageSelected = PageSelected + 1;
										SelectPage();
									}
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-right"></i>
								</span>
							</button>

							<button
								aria-label="close"
								class="button is-small"
								onclick={() => {
									PageSelected = TotalPages;
									SelectPage();
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-double-right"></i>
								</span>
							</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Right side -->
			<div class="level-right">
				<span class="level-item">
					<span class="label_rows_per_page">Rows per page</span>
					<div class="select is-small">
						<select
							name="rows_per_page"
							onchange={(e) => {
								//console.log(e.target.value);
								PageSizeSelected = e.target.value;
								FilterData();
							}}
						>
							{#each PageSize as item, itd}
								<option value={itd} selected={item == PageSize[PageSizeSelected]}>{item}</option>
							{/each}
						</select>
					</div>
				</span>
			</div>
		</nav>
	</div>
{:else}
	<div class="has-text-centered has-text-link-dark">
		<i class="fa fa-table" aria-hidden="true"></i>
		There is no data to show
	</div>
{/if}

<div class="modal" class:is-active={ShowDialogColumn}>
	<div class="modal-card">
		<header class="modal-card-head has-background-dark">
			<p class="modal-card-title has-text-white">
				<b>
					<span>Columns</span>
				</b>
			</p>
			<button
				class="delete"
				aria-label="close"
				onclick={(e) => {
					ShowDialogColumn = false;
				}}
			></button>
		</header>
		<section class="modal-card-body">
			<div class="columns">
				{#each Object.keys(columns) as col}
					<div class="column">
						<label class="checkbox">
							<input type="checkbox" />
							{col}
						</label>
					</div>
				{/each}
			</div>
		</section>

		<footer class="modal-card-foot has-background-dark">
			<button class="button is-success is-small">
				<span>Accept</span>
			</button>
			<button
				class="button is-small"
				onclick={(e) => {
					ShowDialogColumn = false;
				}}
			>
				<span>Cancel</span>
			</button>
		</footer>
	</div>
</div>

<style>
	.size_search {
		width: 7em;
	}
	.show_cursor_mouse {
		cursor: pointer;
	}

	.table_pagination {
		width: 98%;
		margin: auto;
	}
	.label_rows_per_page {
		margin-right: 1em;
	}
	.margin_title {
		margin-left: 0.5em;
	}

	.check_margin {
		margin-left: 10px;
	}
	.slot_padding {
		margin: 0.1em !important;
	}
</style>
