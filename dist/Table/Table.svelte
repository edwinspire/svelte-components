<script>
	'use strict';
	//import { crypto } from "crypto";
	import * as XLSX from 'xlsx';
	import { createEventDispatcher } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import { DateTime as DT, Auto } from './Column/DefaultTypes.js';
	//	import { DateTime } from 'luxon';
	import { storeChangedTables } from '../class/websocket.js';
	import { sha256 } from '../class/sha.js';
	import Level from '../Level/Level.svelte';
	import { ExportTableToHTML, ExportTableToXlsx } from './utils/export_data.js';

	//-      -//
	//TODO Habilitar mostrar u ocultar columnas
	//TODO Fijar encabezado
	//TODO Hacer celdas editables
	//TODO Hacer columnas con ancho ajustable
	//TODO Cuando se presiona exportar se coloca como selección multiple, sin embargo no cambia en el menú de tipo de  selección

	export let RawDataTable = [];
	export let SelectionType = 0;
	export let columns = {};
	//export let url = '';
	//export let params = {};
	export let ShowNewButton = false;
	export let ShowEditButton = false;
	export let ShowSelectionButton = true;
	export let ShowExportButton = true;
	export let iconExport = 'fa-solid fa-file-excel';
	export let iconDeleteRow = 'fa-solid fa-trash';

	//export let bearerAuthorization;
	//export let basicAuthorization; // {user: '', password: ''}
	//export let method = 'GET';
	export let ShowDeleteButton = false;

	export let requestData = {
		url: undefined,
		refresh_time: 4,
		params: undefined,
		method: 'GET',
		headers: undefined,
		authorization: { basic: undefined, bearer: undefined }
	};

	export let rowClassFunction = function (row) {
		return '';
	};

	const FetchData = new uFetch();
	const dispatch = createEventDispatcher();
	let DataTable = [];
	let SelectedRows = [];

	let text_search;
	let loading = false;
	let showEdit = false;
	// let showSelection = false;
	let ColumnSort;
	let ShowDialogColumn = false;

	let timeRemainingToRefresh = 999;

	let LastFetchResponse = true;
	// -- Refresh -- //
	let IntervalRefresh = [10, 20, 30, 45, 60, 120, 240, 480, 960, 1920, 3840];

	//-- Pagination --//
	export let PageSize = [25, 50, 100, 200, 300, 500, 1000];
	export let PageSizeSelected = 0;
	export let relatedTablesForAutoRefresh = [];
	// -- Nombre del archivo a exportar -- //
	export let fileNameExport = '';
	let PageSelected = 1;
	let totalFilteredRows = 0;
	let TotalPages = 0;
	let paginatedData = [];

	let SelectAll = false;
	let orderASC = true;
	let internal_columns = {};

	$: SelectedRows, OnSelection();
	$: DataTable, RawDataTable, onrawDataChanged();

	let idTimeoutDataChanged;


	function onrawDataChanged() {
		
		// Cancela el ultimo timeout
		clearTimeout(idTimeoutDataChanged);
		
		// Setea uno nuevo
		idTimeoutDataChanged = setTimeout(() => {
			try {
				//let hash_data = await hash(JSON.stringify(RawDataTable));
				let hash_data = sha256(JSON.stringify(RawDataTable));

				if (hash_last_data !== hash_data) {
					hash_last_data = hash_data;
					ProcessRawData();
				} else {
					console.log('No changes on Data on Table widget');
				}
			} catch (error) {
				console.error(error);
			}
		}, 3000);
	}

	function OnSelection() {
		dispatch('selectrows', { rows: GetSelectedRows() });
	}

	onMount(() => {
		//timeRemainingToRefresh = IntervalRefresh[requestData.refresh_time]||999;
		timeRemainingToRefresh = 0;
		// console.log("XLSX 2", XLSX);
		//    GetDataTable();
		requestData.method = requestData.method || 'GET';
		requestData.refresh_time = Number(requestData.refresh_time)
			? Number(requestData.refresh_time)
			: 4;

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
		if (RawDataTable && RawDataTable.length > 0) {
			let MaxSizeLabel = 15;
			internal_columns = {};

			Object.keys(RawDataTable[0]).forEach((item) => {
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
		return RawDataTable.filter((row) => {
			return SelectedRows.includes(row.internal_hash_row);
		});
	}

	function ExportToHTML() {
		//console.log(this);
		try {
			// Filter only selection

			console.log('ExportTable > Columns ', columns);

			let filteredData = GetSelectedRows();
			if (filteredData && filteredData.length > 0) {
				ExportTableToHTML(filteredData, columns, fileNameExport);
			} else {
				alert('Select the rows to export.');
				SelectionType = 2;
			}
		} catch (error) {
			console.error(error);
		}
	}

	function ExportToExcel() {
		//console.log(this);
		try {
			// Filter only selection

			console.log('ExportTable > Columns ', columns);

			let filteredData = GetSelectedRows();
			if (filteredData && filteredData.length > 0) {
				ExportTableToXlsx(filteredData, columns, fileNameExport);
			} else {
				alert('Select the rows to export.');
				SelectionType = 2;
			}
		} catch (error) {
			console.error(error);
		}
	}

	function fnDeleteRows() {
		//console.log(this);
		try {
			// Filter only selection

			console.log('ExportTable > Columns ', columns);

			let filteredData = GetSelectedRows();
			if (filteredData && filteredData.length > 0) {
			} else {
				alert('Select the rows to export.');
				SelectionType = 2;
			}
		} catch (error) {
			console.error(error);
		}
	}

	let auto_refresh_by_table_changed_request = 0;

	let auto_refresh = setInterval(async () => {
		if (timeRemainingToRefresh == 0 || auto_refresh_by_table_changed_request > 0) {
			await GetDataTable();
			timeRemainingToRefresh = IntervalRefresh[requestData.refresh_time];
			auto_refresh_by_table_changed_request = 0;
		} else {
			timeRemainingToRefresh--;
		}
	}, 1000);

	let hash_last_data = '';
	
	/*
	// Check changes of data
	let check_changes_data = setInterval(() => {
		try {
			//let hash_data = await hash(JSON.stringify(RawDataTable));
			let hash_data = sha256(JSON.stringify(RawDataTable));

			if (hash_last_data !== hash_data) {
				//hash_last_data = hash_data;
				//ProcessRawData();
			}
		} catch (error) {
			console.error(error);
		}
	}, 2000);
	*/

	onDestroy(() => {
		clearInterval(auto_refresh);
		//clearInterval(check_changes_data);
	});

	function ChangeIntervalRefresh() {
		let i = requestData.refresh_time + 1;
		if (IntervalRefresh[i]) {
			requestData.refresh_time = i;
		} else {
			requestData.refresh_time = 0;
		}

		timeRemainingToRefresh = IntervalRefresh[requestData.refresh_time];
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
		dispatch('clickrow', { field: cell, data: row });
	}

	function HClickEditRow(e) {
		dispatch('editrow', { data: e });
	}
	function HClickNew(e) {
		dispatch('newrow', e);
	}

	function HClickDelete(e) {
		dispatch('deleterow', { rows: GetSelectedRows() });
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
			/*
      setTimeout(async () => {
        await GetDataTable();
        FilterData();
      }, 250);
      */
		}
	}

	//GetDataTable();

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

	function handleExportSelection(e) {
		ExportTable();
	}

	function FilterData() {
		//console.log("Filtrar", text_search);
		let TempData;
		if (text_search && text_search.length > 0) {
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
		totalFilteredRows = TempData.length;

		Pagination(TempData);
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

		TotalPages = paginatedData.length;
		if (PageSelected > TotalPages) {
			PageSelected = 1;
		}
		SelectPage();
	}

	function SelectPage() {
		DataTable = paginatedData[PageSelected - 1];
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

	function ProcessRawData() {
		//console.log("ProcessRawData >> ", RawDataTable);
		let Listinternal_hash_row = {}; // Esta variable se usa unicamente para verificar que no se generen llaves duplicadas
		let tmp_RawDataTable = [];

		if (Array.isArray(RawDataTable)) {
			for (const row_org of RawDataTable) {
				let row = { ...row_org };
				row.internal_hash_row = 0;
				let c = sha256(JSON.stringify(row));

				//console.log('Registro HASH >> ', c);
				if (Listinternal_hash_row[c]) {
					console.error('Hay un registro duplicado en la tabla', row);
					c = c + '-' + new Date().getTime() + '-' + Math.floor(Math.random() * 10000);
					Listinternal_hash_row[c] = true;
				} else {
					Listinternal_hash_row[c] = true;
				}
				row.internal_hash_row = c;
				//        tmp_RawDataTable.push({ ...row, internal_hash_row: c });
				tmp_RawDataTable.push(row);
			}
		} else {
			console.log('RawDataTable no es array', RawDataTable);
			RawDataTable = [];
		}

		//console.log(tmp_RawDataTable, RawDataTable);
		RawDataTable = tmp_RawDataTable;
		tmp_RawDataTable = [];
		SetColumns();
		FilterData();
	}

	async function GetDataTable() {
		//console.log('GetDataTable');
		if (loading) {
			console.log('There is a petition in progress.');
		} else {
			if (requestData && requestData.url && requestData.url.length > 0) {
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

					console.log(method_request);

					let res = await FetchData[method_request]({
						url: requestData.url,
						data: requestData.params,
						headers: requestData.headers
					});
					//console.log(res);
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
				//console.warn('Not url asigned');
				LastFetchResponse = false;
			}
		}
	}
</script>

<Level>
	<span slot="l01">
		{#if $$slots.l01}
			<slot name="l01" />
		{/if}
	</span>
	<span slot="l02">
		{#if $$slots.l02}
			<slot name="l02" />
		{/if}
	</span>
	<span slot="l03">
		{#if $$slots.l03}
			<slot name="l03" />
		{/if}
	</span>
	<span slot="l04">
		{#if $$slots.l04}
			<slot name="l04" />
		{/if}
	</span>
	<span slot="l05">
		{#if $$slots.l05}
			<slot name="l05" />
		{/if}
	</span>
	<span slot="l06">
		{#if $$slots.l06}
			<slot name="l06" />
		{/if}
	</span>
	<span slot="l07">
		{#if $$slots.l07}
			<slot name="l07" />
		{/if}
	</span>
	<span slot="l08">
		{#if $$slots.l08}
			<slot name="l08" />
		{/if}
	</span>
	<span slot="l09">
		{#if $$slots.l09}
			<slot name="l09" />
		{/if}
	</span>
	<span slot="l10">
		{#if $$slots.l10}
			<slot name="l10" />
		{/if}
	</span>

	<span slot="r01">
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
				<button class="button is-small" on:click={handleClickSearch}>
					<span class="icon is-small">
						<i class="fas fa-search" />
					</span>
				</button>
			</p>
		</div>
	</span>
	<span slot="r02">
		{#if ShowExportButton}
			<button class="button is-small" on:click={ExportToExcel} title="Export to Excel">
				<span class="icon">
					<i class={iconExport} />
				</span>
			</button>
			<button class="button is-small" on:click={ExportToHTML} title="Export to Html">
				<span class="icon">
					<i class="fa-solid fa-download"></i>
				</span>
			</button>
		{/if}
	</span>
	<span slot="r03">
		{#if ShowSelectionButton}
			<div class="dropdown is-hoverable is-right">
				<div class="dropdown-trigger">
					<button class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu">
						<span class="icon">
							<i class="far fa-list-alt" />
						</span>
					</button>
				</div>
				<div class="dropdown-menu" role="menu">
					<div class="dropdown-content">
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="dropdown-item is-size-7">
							<input
								class="check_margin"
								type="radio"
								name="selection_type"
								value="1"
								checked
								on:change={() => {
									SelectionType = 1;
								}}
							/>
							<span class="icon">
								<i class="fas fa-check" />
							</span>
							<span>Simple</span>
						</a>

						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="dropdown-item is-size-7">
							<input
								class="check_margin"
								type="radio"
								name="selection_type"
								value="2"
								checked
								on:change={() => {
									SelectionType = 2;
								}}
							/>
							<span class="icon">
								<i class="fas fa-check-double" />
							</span>
							<span>Multiple</span>
						</a>
						<hr class="dropdown-divider" />
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="dropdown-item is-size-7">
							<input
								class="check_margin"
								type="radio"
								name="selection_type"
								value="0"
								checked
								on:change={() => {
									SelectionType = 0;
								}}
							/>

							<span class="icon">
								<i class="fas fa-ban" />
							</span>
							<span>None</span>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</span>

	<span slot="r04">
		{#if ShowDeleteButton}
			<button
				class="button is-small"
				on:click={fnDeleteRows}
				title="Delete row"
				on:click={HClickDelete}
			>
				<span class="icon">
					<i class={iconDeleteRow} />
				</span>
			</button>
		{/if}
	</span>

	<span slot="r05" title="Editar">
		{#if ShowEditButton}
			<button class="button is-small" on:click={HandleOnClickEdit}>
				<span class="icon">
					<i class="far fa-edit" />
				</span>
			</button>
		{/if}
	</span>

	<span slot="r06" title="Agregar fila">
		{#if ShowNewButton}
			<button class="button is-small" on:click={HClickNew}>
				<span class="icon">
					<i class="far fa-file" />
				</span>
			</button>
		{/if}
	</span>
	<span slot="r07" title="Data refresh interval.">
		{#if requestData && requestData.url}
			<button class="button is-small" on:click={ChangeIntervalRefresh}>
				{#if loading}
					<span class="icon has-text-info"><i class="fas fa-spinner fa-pulse" /></span>
				{:else if LastFetchResponse}
					<span class="icon"><i class="fas fa-hourglass-half" /></span>
				{:else}
					<span class="icon has-text-danger"><i class="fas fa-exclamation-triangle" /></span>
				{/if}
				<span>{timeRemainingToRefresh}s</span>
			</button>
		{/if}
	</span>

	<span slot="r08">
		{#if $$slots.r08}
			<slot name="r08" />
		{/if}
	</span>

	<span slot="r09">
		{#if $$slots.r09}
			<slot name="r09" />
		{/if}
	</span>

	<span slot="r10">
		{#if $$slots.r10}
			<slot name="r10" />
		{/if}
	</span>
</Level>

{#if DataTable && DataTable.length > 0}
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
							<input type="checkbox" on:click={handleChangeSelectAll} />
						</th>
					{/if}

					{#if showEdit}
						<th class="has-text-centered has-text-white">
							<i class="fas fa-pen" />
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
										on:click={HClickHeader}
									>
										{internal_columns[item].label}
										{#if ColumnSort == item}
											{#if orderASC}
												<i class="fas fa-caret-down" />
											{:else}
												<i class="fas fa-caret-up" />
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
				{#if DataTable && DataTable.length > 0}
					{#each DataTable.filter((ev) => {
						// Se puso este filtro para evitar errores cuando hay registros nulos o no tengan internal_hash_row
						return ev && ev.internal_hash_row;
					}) as dataRow, i (dataRow.internal_hash_row)}
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
										on:click={HandleOnRowSelected}
									/></td
								>
							{:else if SelectionType == 2}
								<td class="has-text-centered">
									<input
										class="show_cursor_mouse"
										type="checkbox"
										checked={RowIsSelected(dataRow.internal_hash_row)}
										data-internal_hash_row={dataRow.internal_hash_row}
										on:click={HandleOnRowSelected}
									/>
								</td>
							{/if}

							{#if showEdit}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<td class="has-text-centered show_cursor_mouse" on:click={HClickEditRow(dataRow)}>
									<span class="icon is-small">
										<i class="fas fa-pen" />
									</span>
								</td>
							{/if}

							{#each Object.keys(dataRow) as item, itd}
								<!-- Muestra las columnas que no se hayan especificado como ocultas -->
								{#if internal_columns[item]}
									{#if !internal_columns[item].hidden || internal_columns[item].hidden == null}
										{#if internal_columns[item].decorator && internal_columns[item].decorator.component}
											<svelte:component
												this={internal_columns[item].decorator.component}
												props={internal_columns[item].decorator.props}
												on:click={(e) => {
													// console.log('HClickCell 1');
													// e.preventDefault();
													HClickCell(item, dataRow);
												}}
												bind:row={dataRow}
												bind:value={dataRow[item]}
											/>
										{:else}
											<svelte:component
												this={Auto}
												props={false}
												on:click={(e) => {
													// console.log('HClickCell 2');
													//  e.preventDefault();
													HClickCell(item, dataRow);
												}}
												bind:row={dataRow}
												bind:value={dataRow[item]}
											/>
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
								class="button is-small"
								on:click={() => {
									PageSelected = 1;
									SelectPage();
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-double-left" />
								</span>
							</button>
							<button
								class="button is-small"
								on:click={() => {
									if (PageSelected > 1) {
										PageSelected = PageSelected - 1;
									}
									SelectPage();
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-left" />
								</span>
							</button>
							<button
								class="button is-small is-info"
								on:click={() => {
									//PageSelected = 1;
									SelectPage();
								}}>{PageSelected}</button
							>
							{#if PageSelected + 1 <= TotalPages}
								<button
									class="button is-small"
									on:click={() => {
										PageSelected = PageSelected + 1;
										SelectPage();
									}}>{PageSelected + 1}</button
								>
							{/if}
							{#if PageSelected + 2 <= TotalPages}
								<button
									class="button is-small"
									on:click={() => {
										PageSelected = PageSelected + 2;
										SelectPage();
									}}>{PageSelected + 2}</button
								>
							{/if}

							{#if PageSelected + 3 <= TotalPages}
								<button
									class="button is-small"
									on:click={() => {
										PageSelected = PageSelected + 3;
										SelectPage();
									}}>{PageSelected + 3}</button
								>
							{/if}

							{#if PageSelected + 4 <= TotalPages}
								<button
									class="button is-small"
									on:click={() => {
										PageSelected = PageSelected + 4;
										SelectPage();
									}}>{PageSelected + 4}</button
								>
							{/if}

							<button
								class="button is-small"
								on:click={() => {
									if (PageSelected < TotalPages) {
										PageSelected = PageSelected + 1;
										SelectPage();
									}
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-right" />
								</span>
							</button>

							<button
								class="button is-small"
								on:click={() => {
									PageSelected = TotalPages;
									SelectPage();
								}}
							>
								<span class="icon">
									<i class="fas fa-angle-double-right" />
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
						<!-- svelte-ignore a11y-no-onchange -->
						<select
							name="rows_per_page"
							on:change={(e) => {
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
		<i class="fa fa-table" aria-hidden="true" />
		There is no data to show
	</div>
{/if}

<div class="modal" class:is-active={ShowDialogColumn}>
	<div class="modal-background" />
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
				on:click={(e) => {
					ShowDialogColumn = false;
				}}
			/>
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
				on:click={(e) => {
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
</style>
