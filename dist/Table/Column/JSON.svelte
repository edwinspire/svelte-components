<script>
  import TCellJSON from "./CellJSON.svelte";
  export let value;
  export const row = {};
  export const props = {};
</script>

<td on:click class={props.class}>
    <TCellJSON {value} />
</td>
