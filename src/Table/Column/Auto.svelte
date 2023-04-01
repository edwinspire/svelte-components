<script>
  import TCellJSON from "./CellJSON.svelte";
  export let value;
  //export let row = {};
  export let props = {};

  function stringIsValidJSON(input) {
    //    console.log(row);
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<td on:click class={props.class}>
  {#if value && (typeof value === "object" || Array.isArray(value))}
    <details>
      <summary>[<b>{typeof value}</b>]</summary>
      <TCellJSON {value} />
    </details>
  {:else if (typeof value === "string" || typeof value === "number" || typeof value === "bigint" || typeof value === "boolean" || typeof value === "undefined")}
    {#if typeof value === "string" && stringIsValidJSON(value) && (typeof JSON.parse(value) === "object" || Array.isArray(typeof JSON.parse(value)))}
      <details>
        <summary>[<b>{typeof JSON.parse(value)}</b>]</summary>
        <TCellJSON value={JSON.parse(value)} />
      </details>
    {:else if typeof value === "number"}
    <div class="text_end">{value}</div>
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div>{value}</div>
    {/if}
  {:else}
    <span>{JSON.stringify(value)}</span>
  {/if}
</td>

<style>
  .text_end{
    text-align: end
  }
</style>