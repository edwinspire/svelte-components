<script>
	import TreeNode from './TreeNode.svelte';
	// export let value;
	// export let row = {}; // Required by no user directly
	// export const props = {};
	let { value = $bindable(), onclick_cell = () => {}, css_cell = '' } = $props();
	let copied = $state(false);

	function copyToClipboard(e) {
		e.stopPropagation();
		e.preventDefault();
		if (value) {
			navigator.clipboard.writeText(JSON.stringify(value, null, 2));
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		}
	}
</script>

<td onclick={onclick_cell} class={css_cell}>
	{#if value && typeof value === 'object'}
		<details class="tree-root">
			<summary>
				<span class="icon is-small toggle-icon">
					<i class="fa-solid fa-chevron-right has-text-grey"></i>
				</span>
				<span class="key-label">root</span>
				<button
					class="button is-small is-ghost p-0 ml-2"
					onclick={copyToClipboard}
					title="Copy JSON"
				>
					<span class="icon is-small">
						{#if copied}
							<i class="fa-solid fa-check has-text-success"></i>
						{:else}
							<i class="fa-regular fa-copy has-text-grey-light"></i>
						{/if}
					</span>
				</button>
			</summary>
			<ul>
				{#each Object.entries(value) as [k, v]}
					<li>
						<TreeNode key={k} value={v} />
					</li>
				{/each}
			</ul>
		</details>
	{/if}
</td>

<style>
	/* Shared styles that mimic TreeNode to keep consistency */
	ul {
		margin-left: 0.5rem;
		padding-left: 0.5rem;
		border-left: 1px solid #dbdbdb;
		list-style: none;
	}
	li {
		margin: 0.1rem 0;
	}
	summary {
		list-style: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		font-weight: bold;
		user-select: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	details[open] > summary > .toggle-icon i {
		transform: rotate(90deg);
		transition: transform 0.1s ease;
	}
	.icon {
		margin-right: 0.25rem;
		width: 1rem;
		display: inline-flex;
		justify-content: center;
	}
	.key-label {
		color: #363636;
	}
	.tree-root {
		padding: 0.25rem;
	}
</style>
