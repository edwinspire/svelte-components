<script>
  export let value;
  import TCellJSON from "./tree.svelte";
  /**
 * @type {{ [s: string]: any; } | ArrayLike<any>}
 */
  let internal_value;

  if (value != null && value && (typeof value === "object" || Array.isArray(value))) {
    internal_value = value;
  } else {
    try {
      internal_value = JSON.parse(value);
    } catch (error) {
      internal_value = value;
    }
  }
  //console.log(">>>> ", value, internal_value);
</script>

{#if internal_value && (typeof internal_value === "object" || Array.isArray(internal_value))}
  {#each Object.entries(internal_value) as [k1, v1]}
    {#if v1 != null && (typeof v1 === "object" || Array.isArray(v1))}
      <details class="left_space">
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

<style>
  .left_space{
      padding-left: 1em
  }
</style>