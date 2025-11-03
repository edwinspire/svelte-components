<script>
	let { left, right } = $props();
</script>

<nav class="nav_margin">
	<div class="columns is-multiline is-mobile">
		<div
			class="column is-full-mobile
    is-half-tablet
    is-half-desktop
    is-half-widescreen
    is-half-fullhd"
		>
			<div class="container_left">
				{#if Array.isArray(left)}
					{#each left as left_item}
						<span class="slot_padding">{@render left_item?.()}</span>
					{/each}
				{/if}
			</div>
		</div>

		<div
			class="column is-full-mobile
    is-half-tablet
    is-half-desktop
    is-half-widescreen
    is-half-fullhd"
		>
			<div class="container_right">
				{#if Array.isArray(right)}
					{#each right as rigth_item}
						<span class="slot_padding">{@render rigth_item?.()}</span>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
	.slot_padding {
		margin: 0.1em !important;
	}
	.nav_margin {
		margin: 0.25em !important;
		width: 100%;
	}
	.container_right {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
	.container_left {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
</style>
