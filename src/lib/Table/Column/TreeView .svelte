<script>
	import TreeNode from './TreeNode.svelte';
	// export let value;
	// export let row = {}; // Required by no user directly
	// export const props = {};
	let { value = $bindable(), onclick_cell = () => {}, css_cell = '' } = $props();

</script>

<td onclick={onclick_cell} class={css_cell}>
	<details class="left_space">
		<summary><b>root</b></summary>
		<ul>
			{#each Object.entries(value) as [k, v]}
				<TreeNode key={k} value={v}  />
			{/each}
		</ul>
	</details>
</td>

<style>
	ul {
		list-style: none;
		margin-left: 0.75em;
		padding: 0;
	}
</style>
