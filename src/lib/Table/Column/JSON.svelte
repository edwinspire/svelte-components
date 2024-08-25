<script>
  import TCellJSON from "./CellJSON.svelte";
  export let value;
  export let row = {}; // Required by no user directly
  export const props = {};
</script>

<td on:click class={props.class}>
    <TCellJSON {value} />
</td>
