<script>
  import TCellJSON from "./CellJSON.svelte";
  export let value;
  export const row = {};
  export const props = {};
</script>

<td on:click>
  {#if value && (typeof value === "object" || Array.isArray(value))}
    <details>
      <summary>[<b>{typeof value}</b>]</summary>
      <TCellJSON {value} />
    </details>
  {:else if value && (typeof value === "string" || typeof value === "number" || typeof value === "bigint" || typeof value === "boolean" || typeof value === "undefined")}
    <span on:click>{value}</span>
  {:else}
    <span>{JSON.stringify(value)}</span>
  {/if}
</td>
