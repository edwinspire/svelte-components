<script>
  export let value;
  import TCellJSON from "./CellJSON.svelte";
</script>

{#if value && (typeof value === "object" || Array.isArray(value))}
  {#each Object.entries(value) as [k1, v1]}
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
  <TCellJSON value={JSON.stringify(value)} />
{/if}
