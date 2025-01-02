<script>
	import TreeNode from './TreeNode.svelte';

	let { value = $bindable(), key = '' } = $props();
</script>

{#if typeof value == 'object' && value !== null}
	<details>
		<summary><b>{key}</b> {typeof value !== 'object' || value === null ? String(value) : ''}</summary>
		{#if typeof value === 'object' && value !== null}
			<ul>
				{#if Array.isArray(value)}
					{#each value as item, index}
						<li>
							<TreeNode key={`[${index}]`} value={item} />
						</li>
					{/each}
				{:else}
					{#each Object.entries(value) as [childKey, childValue]}
						<li>
							<TreeNode key={childKey} value={childValue} />
						</li>
					{/each}
				{/if}
			</ul>
		{:else}
			hhhh
		{/if}
	</details>
{:else}
	<li style="list-style: disc; margin: 0.2em 0 0 1em;"><b>{key}:</b> {value}</li>
{/if}

<style>
	li {
		margin: 0.2em 0;
	}
	ul {
		margin-left: 0.75em;
	}
</style>
