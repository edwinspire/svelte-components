<script>
  import TCellJSON from "./CellJSON.svelte";
  export let value;
  export const row = {};
  export const props = {};

  function stringIsValidJSON(input) {
    if (typeof input === "string") {
      try {
        let x = JSON.parse(input);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
</script>

<td on:click class={props.class}>
  {#if value && (typeof value === "object" || Array.isArray(value))}
    <details>
      <summary>[<b>{typeof value}</b>]</summary>
      <TCellJSON {value} />
    </details>
  {:else if value && (typeof value === "string" || typeof value === "number" || typeof value === "bigint" || typeof value === "boolean" || typeof value === "undefined")}
    {#if typeof value === "string" && stringIsValidJSON(value) && (typeof JSON.parse(value) === "object" || Array.isArray(typeof JSON.parse(value)))}
      <details>
        <summary>[<b>{typeof JSON.parse(value)}</b>]</summary>
        <TCellJSON value={JSON.parse(value)} />
      </details>
    {:else}
      <span on:click>{value}</span>
    {/if}
  {:else}
    <span>{JSON.stringify(value)}</span>
  {/if}
</td>
