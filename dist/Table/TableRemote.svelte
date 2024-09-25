<script>
    "use strict";
  import { onDestroy, onMount } from "svelte";
  //import { GetData } from "./GetData";
  import { Table } from "./Table";
  import uFetch from "@edwinspire/universal-fetch";

  export let columns = {};
  export let RawDataTable = [];
  export let url = "/notseturl";
  export let params = {};

  let uf = new uFetch();

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
    //DataTable = await GetData(url);



  }
</script>
<Table bind:columns bind:RawDataTable></Table>

