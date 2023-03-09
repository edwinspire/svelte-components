<script>
  "use strict";
  //import { crypto } from "crypto";
  import { XLSX } from "xlsx";
  import { createEventDispatcher } from "svelte";
  import { onDestroy, onMount } from "svelte";
  import uFetch from "@edwinspire/universal-fetch";
  //  const Json = require("./Column/DefaultTypes.js").Json;
  import { DateTime as DT, Auto } from "./Column/DefaultTypes.js";
  //import DT = require("./Column/DefaultTypes.js").DateTime;
  import { DateTime } from "luxon";
  import { storeChangedTables } from "../class/websocket.js";

  //-      -//
  //TODO Habilitar mostrar u ocultar columnas
  //TODO Fijar encabezado
  //TODO Hacer celdas editables
  //TODO Hacer columnas con ancho ajustable
  //TODO Cuando se presiona exportar se coloca como selección multiple, sin embargo no cambia en el menú de tipo de  selección

  export let RawDataTable = [];
  export let SelectionType = 0;
  export let columns = {};
  export let url = "";
  export let params = {};
  export let ShowNewButton = false;
  export let ShowEditButton = false;
  const FetchData = new uFetch();
  const dispatch = createEventDispatcher();
  let DataTable = [];
  let SelectedRows = [];

  let text_search;
  let loading = false;
  let showEdit = false;
  let showSelection = false;
  let ColumnSort;
  let ShowDialogColumn = false;

  let timeRemainingToRefresh = 999;

  let LastFetchResponse = true;
  // -- Refresh -- //
  let IntervalRefresh = [10, 20, 30, 45, 60, 120, 240, 480, 960, 1920, 3840];
  export let IntervalRefreshSelected = 4;
  //-- Pagination --//
  let PageSize = [25, 50, 100, 200, 300, 500, 1000];
  export let PageSizeSelected = 0;
  export let relatedTablesForAutoRefresh = [];
  // -- Nombre del archivo a exportar -- //
  export let fileNameExport = "";
  let PageSelected = 1;
  let totalFilteredRows = 0;
  let TotalPages = 0;
  let paginatedData = [];

  let SelectAll = false;
  let orderASC = true;
  let internal_columns = {};

  $: SelectedRows, OnSelection();
  $: RawDataTable, ProcessRawData();

  /*
  async function sha(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest("SHA-1", data);
    return [...new Uint8Array(hash)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  }
  */

  function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    });
  }

  function OnSelection() {
    dispatch("selectrows", { rows: GetSelectedRows() });
  }

  onMount(() => {
    //timeRemainingToRefresh = IntervalRefresh[IntervalRefreshSelected]||999;
    timeRemainingToRefresh = 0;

    //    GetDataTable();

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
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    chunk_size = parseInt(chunk_size);

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  function SetColumns() {
    if (RawDataTable && RawDataTable.length > 0) {
      let MaxSizeLabel = 15;
      internal_columns = {};
      Object.keys(RawDataTable[0]).forEach((item) => {
        if (item === "internal_hash_row") {
          internal_columns[item] = {
            label: item.substring(0, MaxSizeLabel),
            hidden: true,
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
            hidden: false,
          };
        }
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

  function ExportTable() {
    //console.log(this);
    try {
      // Filter only selection
      let filteredData = GetSelectedRows();
      let ExceedsCharacterLimitPerCell = false;
      let FormatedData = filteredData.map((row) => {
        let r = { ...row };
        // Convert to string objects
        Object.keys(row).forEach((key) => {
          if (
            columns[key] &&
            columns[key].decorator &&
            columns[key].decorator.component &&
            columns[key].decorator.component === DT
          ) {
            //r[key] = new Date(row[key]).toISOString();
            r[key] = DateTime.fromISO(row[key]).toFormat("yyyy-MM-dd HH:mm:ss");
          } else if (row[key] !== null && typeof row[key] === "object") {
            //r[key] = JSON.stringify(row[key], null, 4);
            r[key] = JSON.stringify(row[key]);
            let caracteres = r[key].length;
            //32767 es el limite de caracteres por celda en un xlsx
            if (caracteres >= 32767) {
              ExceedsCharacterLimitPerCell = true;
              console.warn(
                `El valor de la columna ${key} es muy largo para ser exportado, se ha limitado a 32767 caracteres`
              );
            }
          }
        });
        delete r.internal_hash_row;
        return r;
      });

      if (FormatedData && FormatedData.length > 0) {
        /* Create a worksheet */
        var ws = XLSX.utils.json_to_sheet(FormatedData);
        /* Create a new empty workbook, then add the worksheet */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        let ExtensionFile = "xlsx";
        if (ExceedsCharacterLimitPerCell) {
          ExtensionFile = "csv";
        }

        let fName = "Report";

        if (fName && fName.length > 0) {
          fName = fileNameExport;
        }

        let NameFile = `${fName}_${DateTime.local().toFormat(
          "yyyy-MM-dd_HH-mm-ss"
        )}.${ExtensionFile}`;

        var wopts = {
          bookType: ExtensionFile,
          bookSST: false,
          type: "binary",
          FS: ";",
        };
        XLSX.writeFile(wb, NameFile, wopts);
      } else {
        alert("Debe Seleccionar las filas para exportar");
        SelectionType = 2;
      }
    } catch (error) {
      console.error(error);
    }
  }

  let auto_refresh_by_table_changed_request = 0;

  let auto_refresh = setInterval(async () => {
    if (
      timeRemainingToRefresh == 0 ||
      auto_refresh_by_table_changed_request > 0
    ) {
      await GetDataTable();
      timeRemainingToRefresh = IntervalRefresh[IntervalRefreshSelected];
      auto_refresh_by_table_changed_request = 0;
    } else {
      timeRemainingToRefresh--;
    }
  }, 1000);

  onDestroy(() => {
    clearInterval(auto_refresh);
  });

  function ChangeIntervalRefresh() {
    let i = IntervalRefreshSelected + 1;
    if (IntervalRefresh[i]) {
      IntervalRefreshSelected = i;
    } else {
      IntervalRefreshSelected = 0;
    }

    timeRemainingToRefresh = IntervalRefresh[IntervalRefreshSelected];
  }

  function SortColumn(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  function HClickCell(cell, row) {
    dispatch("clickrow", { field: cell, data: row });
  }

  function HClickEditRow(e) {
    dispatch("editrow", { data: e });
  }
  function HClickNew(e) {
    dispatch("newrow", e);
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
            return item
              .toString()
              .toUpperCase()
              .includes(text_search.toUpperCase());
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
    if (ColumnSort) {
      if (orderASC) {
        rows = rows.sort(SortColumn(ColumnSort));
      } else {
        rows = rows.sort(SortColumn(ColumnSort, "desc"));
      }
    }
    //console.log(PageSize, PageSizeSelected);
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

  async function ProcessRawData() {
    console.log("ProcessRawData >> ");
    let Listinternal_hash_row = {}; // Esta variable se usa unicamente para verificar que no se generen llaves duplicadas
    let tmp_RawDataTable = [];

    if (Array.isArray(RawDataTable)) {
      for (const row of RawDataTable) {
        let c = await hash(JSON.stringify(row));

        //  console.log("Registro HASH >> ", c);
        if (Listinternal_hash_row[c]) {
          console.error("Hay un registro duplicado en la tabla", row);
          c =
            c +
            "-" +
            new Date().getTime() +
            "-" +
            Math.floor(Math.random() * 10000);
          Listinternal_hash_row[c] = true;
        } else {
          Listinternal_hash_row[c] = true;
        }

        tmp_RawDataTable.push({ ...row, internal_hash_row: c });
      }
    }

    //    console.log(tmp_RawDataTable, RawDataTable);
    RawDataTable = { ...tmp_RawDataTable };
    tmp_RawDataTable = [];
    SetColumns();
    FilterData();
  }

  async function GetDataTable() {
    console.log("GetDataTable");
    if (loading) {
      console.log("Hay una petición en curso");
    } else {
      if (url && url.length > 0) {
        try {
          loading = true;
          let res = await FetchData.get(url, params);
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
        console.warn("Not url asigned");
        LastFetchResponse = false;
      }
    }
  }
</script>

<!-- Main container -->
<nav class="level">
  <!-- Left side -->
  <div class="level-left">
    <div class="level-item">
      <span class="margin_title"><slot name="title">.</slot></span>
    </div>
  </div>

  <!-- Right side -->
  <div class="level-right">
    {#if url}
      <div class="level-item" title="Intervalo de refresco">
        <button class="button is-small" on:click={ChangeIntervalRefresh}>
          {#if loading}
            <span class="icon has-text-info"
              ><i class="fas fa-spinner fa-pulse" /></span
            >
          {:else if LastFetchResponse}
            <span class="icon"><i class="fas fa-hourglass-half" /></span>
          {:else}
            <span class="icon has-text-danger"
              ><i class="fas fa-exclamation-triangle" /></span
            >
          {/if}
          <span>{timeRemainingToRefresh}s</span>
        </button>
      </div>
    {/if}
    <!-- <slot name="item-1" class="level-item" /> -->
    {#if $$slots.item1}
      <div class="level-item">
        <slot name="item1" />
      </div>
    {/if}
    {#if $$slots.item2}
      <div class="level-item">
        <slot name="item2" />
      </div>
    {/if}
    {#if $$slots.item3}
      <div class="level-item">
        <slot name="item3" />
      </div>
    {/if}
    {#if $$slots.item4}
      <div class="level-item">
        <slot name="item4" />
      </div>
    {/if}
    {#if $$slots.item5}
      <div class="level-item">
        <slot name="item5" />
      </div>
    {/if}
    {#if $$slots.item6}
      <div class="level-item">
        <slot name="item6" />
      </div>
    {/if}
    {#if $$slots.item7}
      <div class="level-item">
        <slot name="item7" />
      </div>
    {/if}
    {#if $$slots.item8}
      <div class="level-item">
        <slot name="item8" />
      </div>
    {/if}
    {#if $$slots.item9}
      <div class="level-item">
        <slot name="item9" />
      </div>
    {/if}
    {#if $$slots.item10}
      <div class="level-item">
        <slot name="item10" />
      </div>
    {/if}
    {#if ShowNewButton}
      <div class="level-item" title="Agregar fila">
        <button class="button is-small" on:click={HClickNew}>
          <span class="icon">
            <i class="far fa-file" />
          </span>
        </button>
      </div>
    {/if}

    {#if ShowEditButton}
      <div class="level-item" title="Editar">
        <button class="button is-small" on:click={HandleOnClickEdit}>
          <span class="icon">
            <i class="far fa-edit" />
          </span>
        </button>
      </div>
    {/if}
    <div class="level-item" title="Selección">
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
          <button
            class="button is-small"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
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
              <span>Ninguno</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="level-item" title="Exportar Datos">
      <button class="button is-small" on:click={handleExportSelection}>
        <span class="icon">
          <i class="far fa-file-excel" />
        </span>
      </button>
    </div>

    <div class="level-item">
      <div class="field has-addons">
        <p class="control">
          <input
            class="input size_search is-small"
            type="text"
            placeholder="Buscar"
            bind:value={text_search}
          />
        </p>
        <p class="control">
          <button class="button is-small" on:click={handleClickSearch}>
            <i class="fas fa-search" />
          </button>
        </p>
      </div>
    </div>
  </div>
</nav>

{#if DataTable && DataTable.length > 0}
  <div class="table-container is-size-7">
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <!-- Aqui escribe el encabezado de la tabla -->
      <thead>
        <tr>
          <th class="has-text-centered">#</th>
          {#if SelectionType == 1}
            <th class="has-text-centered"><span>-</span></th>
          {/if}

          {#if SelectionType == 2}
            <th class="has-text-centered">
              <input type="checkbox" on:click={handleChangeSelectAll} />
            </th>
          {/if}

          {#if showEdit}
            <th class="has-text-centered">
              <i class="fas fa-pen" />
            </th>
          {/if}

          {#each Object.keys(DataTable[0]) as item, ith}
            <!-- Muestra las columnas que no se hayan especificado como ocultas -->
            {#if internal_columns[item]}
              {#if !internal_columns[item].hidden || !internal_columns[item].hidden == null}
                <!-- Mostramos label si esque existe -->
                <th
                  class="has-text-centered show_cursor_mouse"
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
        </tr>
      </thead>
      <tbody>
        {#each DataTable as dataRow, i (dataRow.internal_hash_row)}
          <tr>
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
            {/if}

            {#if SelectionType == 2}
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
              <td
                class="has-text-centered show_cursor_mouse"
                on:click={HClickEditRow(dataRow)}
              >
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
                      on:click={HClickCell(item, dataRow)}
                      row={dataRow}
                      value={dataRow[item]}
                    />
                  {:else}
                    <svelte:component
                      this={Auto}
                      props={false}
                      on:click={HClickCell(item, dataRow)}
                      row={dataRow}
                      value={dataRow[item]}
                    />
                  {/if}
                {/if}
              {/if}
            {/each}
          </tr>
        {/each}
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
              Página {PageSelected} de {TotalPages} (Total {totalFilteredRows}
              filas)
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
                <span class="icon ">
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
                <span class="icon ">
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
          <span class="label_rows_per_page">Filas por página</span>
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
                <option
                  value={itd}
                  selected={item == PageSize[PageSizeSelected]}>{item}</option
                >
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
    No hay datos que mostrar
  </div>
{/if}

<div class="modal" class:is-active={ShowDialogColumn}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head has-background-dark">
      <p class="modal-card-title has-text-white">
        <b>
          <span>Columnas</span>
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
        <span>Aceptar</span>
      </button>
      <button
        class="button is-small"
        on:click={(e) => {
          ShowDialogColumn = false;
        }}
      >
        <span>Cancelar</span>
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
