<script>
    "use strict";
  import { onDestroy, onMount } from "svelte";
  import { GetData } from "./GetData";
  import { Table } from "./Table";

  export let columns = {};
  export let url = "/notseturl";
  export let params = {};

  let DataTable = [];

  let auto_refresh = setInterval(() => {
    GetDataTable();
  }, 15 * 1000);

  onMount(() => {
    GetDataTable();
  });

  onDestroy(() => {
    console.log("Mata refresh");
    clearInterval(auto_refresh);
  });

  async function GetDataTable() {
    DataTable = await GetData(url);
  }
</script>
<Table ></Table>

