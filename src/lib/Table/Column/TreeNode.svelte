<script>
	import TreeNode from './TreeNode.svelte';

	let { value = $bindable(), key = '' } = $props();

	function getType(val) {
		if (val === null) return 'null';
		return typeof val;
	}
</script>

{#if value && typeof value === 'object'}
	<details>
		<summary>
			<span class="icon is-small toggle-icon">
				<i class="fa-solid fa-chevron-right has-text-grey"></i>
			</span>
			<span class="key-label">{key}</span>
			{#if Array.isArray(value)}
				<span class="meta-label"> [{value.length}]</span>
			{/if}
		</summary>
		<ul>
			{#if Array.isArray(value)}
				{#each value as item, index}
					<li>
						<TreeNode key={index} value={item} />
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
	</details>
{:else}
	<div class="leaf-node">
		<span class="key-label">{key}:</span>
		<span class="value-label {getType(value)}">{String(value)}</span>
	</div>
{/if}

<style>
	/* Hierarchy Lines */
	ul {
		margin-left: 0.5rem;
		padding-left: 0.5rem;
		border-left: 1px solid #dbdbdb;
		list-style: none;
	}

	li {
		margin: 0.1rem 0;
	}

	/* Details & Summary */
	details {
		margin-left: 0.2rem;
	}
	summary {
		list-style: none;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		padding: 0.1rem 0;
		border-radius: 4px;
	}
	summary:hover {
		background-color: rgba(0, 0, 0, 0.02);
	}
	summary::-webkit-details-marker {
		display: none;
	}

	/* Icon Animation */
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

	/* Typography & Colors */
	.key-label {
		font-weight: 600;
		color: #363636;
		margin-right: 0.4rem;
	}
	.meta-label {
		color: #b5b5b5;
		font-size: 0.85em;
	}

	.leaf-node {
		margin-left: 1.45rem; /* Align with summary text (icon width + gap) */
		display: flex;
		align-items: flex-start;
	}

	.value-label {
		word-break: break-all;
	}

	.value-label.string {
		color: #2e7d32;
	} /* Green */
	.value-label.number {
		color: #1565c0;
	} /* Blue */
	.value-label.boolean {
		color: #c62828;
	} /* Red */
	.value-label.null {
		color: #9e9e9e;
		font-style: italic;
	} /* Gray */
</style>
