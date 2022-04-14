<script>
  export let value;
  import TCellJSON from "./CellJSON.svelte";
  let internal_value;

  if (value && (typeof value === "object" || Array.isArray(value))) {
    internal_value = value;
  } else {
    try {
      internal_value = JSON.parse(value);
    } catch (error) {
      internal_value = value;
    }
  }
  console.log(internal_value);
</script>

{#if internal_value && (typeof internal_value === "object" || Array.isArray(internal_value))}
  {#each Object.entries(internal_value) as [k1, v1]}
    {#if typeof v1 === "object" || Array.isArray(v1)}
      <details>
        <summary><b>{k1}</b></summary>
        <TCellJSON value={v1} />
      </details>
    {:else}
      <div><b>{k1}:</b> {v1}</div>
    {/if}
  {/each}
{:else}
  <span>{internal_value}</span>
{/if}
