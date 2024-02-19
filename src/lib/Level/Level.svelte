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
				{#if $$slots.l01}
					<span class="slot_padding"><slot name="l01" /></span>
				{/if}
				{#if $$slots.l02}
					<span class="slot_padding"><slot name="l02" /></span>
				{/if}
				{#if $$slots.l03}
					<span class="slot_padding"><slot name="l03" /></span>
				{/if}
				{#if $$slots.l04}
					<span class="slot_padding"><slot name="l04" /></span>
				{/if}
				{#if $$slots.l05}
					<span class="slot_padding"><slot name="l05" /></span>
				{/if}
				{#if $$slots.l06}
					<span class="slot_padding"><slot name="l06" /></span>
				{/if}
				{#if $$slots.l07}
					<span class="slot_padding"><slot name="l07" /></span>
				{/if}
				{#if $$slots.l08}
					<span class="slot_padding"><slot name="l08" /></span>
				{/if}
				{#if $$slots.l09}
					<span class="slot_padding"><slot name="l09" /></span>
				{/if}
				{#if $$slots.l10}
					<span class="slot_padding"><slot name="l10" /></span>
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
				{#if $$slots.r10}
					<span class="slot_padding"><slot name="r10" /></span>
				{/if}
				{#if $$slots.r09}
					<span class="slot_padding"><slot name="r09" /></span>
				{/if}
				{#if $$slots.r08}
					<span class="slot_padding"><slot name="r08" /></span>
				{/if}
				{#if $$slots.r07}
					<span class="slot_padding"><slot name="r07" /></span>
				{/if}
				{#if $$slots.r06}
					<span class="slot_padding"><slot name="r06" /></span>
				{/if}
				{#if $$slots.r05}
					<span class="slot_padding"><slot name="r05" /></span>
				{/if}
				{#if $$slots.r04}
					<span class="slot_padding"><slot name="r04" /></span>
				{/if}
				{#if $$slots.r03}
					<span class="slot_padding"><slot name="r03" /></span>
				{/if}
				{#if $$slots.r02}
					<span class="slot_padding"><slot name="r02" /></span>
				{/if}
				{#if $$slots.r01}
					<span class="slot_padding"><slot name="r01" /></span>
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
