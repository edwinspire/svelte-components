<script>
	let {
		left_01,
		left_02,
		left_03,
		left_04,
		left_05,
		left_06,
		left_07,
		left_08,
		left_09,
		left_10,
		right_01,
		right_02,
		right_03,
		right_04,
		right_05,
		right_06,
		right_07,
		right_08,
		right_09,
		right_10
	} = $props();
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
				{#if left_01}
					<span class="slot_padding">{@render left_01?.()}</span>
				{/if}
				{#if left_02}
					<span class="slot_padding">{@render left_02?.()}</span>
				{/if}
				{#if left_03}
					<span class="slot_padding">{@render left_03?.()}</span>
				{/if}
				{#if left_04}
					<span class="slot_padding">{@render left_04?.()}</span>
				{/if}
				{#if left_05}
					<span class="slot_padding">{@render left_05?.()}</span>
				{/if}
				{#if left_06}
					<span class="slot_padding">{@render left_06?.()}</span>
				{/if}
				{#if left_07}
					<span class="slot_padding">{@render left_07?.()}</span>
				{/if}
				{#if left_08}
					<span class="slot_padding">{@render left_08?.()}</span>
				{/if}
				{#if left_09}
					<span class="slot_padding">{@render left_09?.()}</span>
				{/if}
				{#if left_10}
					<span class="slot_padding">{@render left_10?.()}</span>
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
				{#if right_10}
					<span class="slot_padding">{@render right_10?.()}</span>
				{/if}
				{#if right_09}
					<span class="slot_padding">{@render right_09?.()}</span>
				{/if}
				{#if right_08}
					<span class="slot_padding">{@render right_08?.()}</span>
				{/if}
				{#if right_07}
					<span class="slot_padding">{@render right_07?.()}</span>
				{/if}
				{#if right_06}
					<span class="slot_padding">{@render right_06?.()}</span>
				{/if}
				{#if right_05}
					<span class="slot_padding">{@render right_05?.()}</span>
				{/if}
				{#if right_04}
					<span class="slot_padding">{@render right_04?.()}</span>
				{/if}
				{#if right_03}
					<span class="slot_padding">{@render right_03?.()}</span>
				{/if}
				{#if right_02}
					<span class="slot_padding">{@render right_02?.()}</span>
				{/if}
				{#if right_01}
					<span class="slot_padding">{@render right_01?.()}</span>
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
