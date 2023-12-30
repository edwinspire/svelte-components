<script>
	export let show = false;
</script>

<div on:keydown>
	<div class="overlay" style="width: {show ? '100%' : '0%'};">
		<div class="overlay-content box">
			<slot />
		</div>
	</div>
</div>

<style>
	.overlay {
		height: 100%;
		width: 0;
		position: fixed;
		z-index: 5;
		top: 0;
		left: 0;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.8);
		overflow-x: hidden;
		transition: 0.5s;
	}

	.overlay-content {
		position: relative;
		padding: 1%;
		height: 95%;
		overflow-y: auto; /* Agrega un scroll vertical si el contenido es más grande que el contenedor */
		box-sizing: border-box; /* Incluye el padding en el cálculo del tamaño total */
		margin: 1%;
	}
</style>
