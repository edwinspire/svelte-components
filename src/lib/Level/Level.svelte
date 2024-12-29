<script>
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
				{#if $$slots.left_01}
					<span class="slot_padding"><slot name="left_01" /></span>
				{/if}
				{#if $$slots.left_02}
					<span class="slot_padding"><slot name="left_02" /></span>
				{/if}
				{#if $$slots.left_03}
					<span class="slot_padding"><slot name="left_03" /></span>
				{/if}
				{#if $$slots.left_04}
					<span class="slot_padding"><slot name="left_04" /></span>
				{/if}
				{#if $$slots.left_05}
					<span class="slot_padding"><slot name="left_05" /></span>
				{/if}
				{#if $$slots.left_06}
					<span class="slot_padding"><slot name="left_06" /></span>
				{/if}
				{#if $$slots.left_07}
					<span class="slot_padding"><slot name="left_07" /></span>
				{/if}
				{#if $$slots.left_08}
					<span class="slot_padding"><slot name="left_08" /></span>
				{/if}
				{#if $$slots.left_09}
					<span class="slot_padding"><slot name="left_09" /></span>
				{/if}
				{#if $$slots.left_10}
					<span class="slot_padding"><slot name="left_10" /></span>
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
				{#if $$slots.right_10}
					<span class="slot_padding"><slot name="right_10" /></span>
				{/if}
				{#if $$slots.right_09}
					<span class="slot_padding"><slot name="right_09" /></span>
				{/if}
				{#if $$slots.right_08}
					<span class="slot_padding"><slot name="right_08" /></span>
				{/if}
				{#if $$slots.right_07}
					<span class="slot_padding"><slot name="right_07" /></span>
				{/if}
				{#if $$slots.right_06}
					<span class="slot_padding"><slot name="right_06" /></span>
				{/if}
				{#if $$slots.right_05}
					<span class="slot_padding"><slot name="right_05" /></span>
				{/if}
				{#if $$slots.right_04}
					<span class="slot_padding"><slot name="right_04" /></span>
				{/if}
				{#if $$slots.right_03}
					<span class="slot_padding"><slot name="right_03" /></span>
				{/if}
				{#if $$slots.right_02}
					<span class="slot_padding"><slot name="right_02" /></span>
				{/if}
				{#if $$slots.right_01}
					<span class="slot_padding"><slot name="right_01" /></span>
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
