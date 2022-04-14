<script>
  import TCellJSON from "./CellJSON.svelte";
  export let value;
  export const row = {};
  export const props = {};
</script>

<td on:click>
    <details>
      <summary>[<b>{typeof value}</b>]</summary>
      <TCellJSON {value} />
    </details>
</td>
