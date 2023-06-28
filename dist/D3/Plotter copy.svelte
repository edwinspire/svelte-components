<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { Level } from '../index.js';

	export let dataInput = [{ date: Date.now(), time: 123 }];
	let width = 640;
	let height = 400;
	let marginTop = 20;
	let marginRight = 20;
	let marginBottom = 30;
	let marginLeft = 40;
	export let limitData = 2000;
	let showResetButton = false;

	let pausar = false;
	let refresh = true;
	let Svg;
	let gx;
	let gy;
	let brush;
	let brushElement;
	let dataSnapshot = [];
	let pathLine;
	let dots;

	let visibleData = [{ date: Date.now(), time: 123 }];

	let x = d3
		.scaleTime()
		.domain(d3.extent(visibleData, (d) => new Date(d.date)))
		.range([marginLeft, width - marginRight]);

	let y = d3
		.scaleLinear()
		.domain([0, d3.max(visibleData, (d) => d.time)])
		.range([height - marginBottom, marginTop]);

	$: line = d3
		.line()
		.x((d, i) => x(new Date(d.date)))
		.y((d) => y(d.time))
		.curve(d3.curveCatmullRom.alpha(0.1));

	//$: d3.select(gy).call(d3.axisLeft(y));
	//$: d3.select(gx).call(d3.axisBottom(x));

	$: dataInput, updateInternalData();

	function xy_Axis() {
		x = d3
			.scaleTime()
			.domain(d3.extent(visibleData, (d) => new Date(d.date)))
			.range([marginLeft, width - marginRight]);

		y = d3
			.scaleLinear()
			.domain([0, d3.max(visibleData, (d) => d.time)])
			.range([height - marginBottom, marginTop]);

		d3.select(gy).call(d3.axisLeft(y));
		d3.select(gx).call(d3.axisBottom(x));
	}

	function updateInternalData() {
		console.log('> updateInternalData >>>>>');

		if (refresh) {
			//visibleData = [...data];
			//			console.log('>>>>>>', dataInput);
			visibleData = [...dataInput]; //data.slice(limitData * -1);
			//console.log(visibleData);
		}
        xy_Axis();
	}

	let updateChart = (event) => {
		//console.log('<<< updateChart >>>', event);
		let extent = event.selection;

		if (!extent) {
			//console.log('extent no existe ++++');
			if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
			console.log('extent Nada');
			resetZoom();
			//  x.domain(d3.extent(visibleData, (d) => new Date(d.date)));
		} else {
			//			dataSnapshot = [...visibleData];

			//x.domain([x.invert(extent[0]), x.invert(extent[1])]);
			d3.select(brushElement).call(brush.move, null); // This remove the grey brush area as soon as the selection has been done

			const selectedData = visibleData.filter(
				(d) => x(d.date) >= extent[0] && x(d.date) <= extent[1]
			); // Filtra los datos dentro de la selección

			// Aquí puedes hacer lo que desees con los datos seleccionados
			console.log(selectedData);
			visibleData = [...selectedData];
		}
	};

	let idleTimeout;
	let idled = () => {
		idleTimeout = null;
	};

	function resetZoom() {
		console.log('Reset', dataSnapshot, visibleData);

		visibleData = [...dataSnapshot];
		//data = [...dataSnapshot];
	}

	onMount(() => {
		//		console.log(Svg);

		brush = d3
			.brushX()
			.extent([
				[marginLeft, marginTop],
				[width - marginRight, height - marginBottom]
			])
			.on('end', updateChart);

		d3.select(brushElement).call(brush);
	});
</script>

<Level>
	<span slot="l01">Hola</span>

	<span slot="r01">
		<div class="buttons are-small">
			<button
				class="button is-small"
				on:click={() => {
					refresh = false;
					dataSnapshot = [...visibleData];
				}}
			>
				<span class="icon is-small">
					<i class="fa-solid fa-camera" />
				</span>
				<span>SnapShot</span>
			</button>

			{#if showResetButton}
				<button class="button" on:click={resetZoom}>Reset Zoom</button>
			{/if}

			<button
				class={refresh ? 'button is-small is-success' : 'button is-small is-danger'}
				on:click={() => {
					refresh = !refresh;
				}}
			>
				<span class="icon is-small">
					{#if refresh}
						<i class="fa-solid fa-lock-open" />
					{:else}
						<i class="fa-solid fa-lock" />
					{/if}
				</span>
				<span>Refresh</span>
			</button>
		</div>
	</span>
</Level>
<div bind:clientWidth={width}>
	<svg {width} {height} bind:this={Svg}>
		<g bind:this={gx} transform={`translate(0, ${height - marginBottom})`} />
		<g bind:this={gy} transform={`translate(${marginLeft}, 0)`} />
		<g
			bind:this={brushElement}
			{width}
			class="brush"
			fill="none"
			pointer-events="all"
			style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
		/>
		<path
			bind:this={pathLine}
			class="line"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			d={line(visibleData)}
		/>
		<g bind:this={dots} class="dots" fill="white" stroke="currentColor" stroke-width="1.5">
			{#each visibleData as d, i}
				<circle class="dot" key={i} cx={x(new Date(d.date))} cy={y(d.time)} r="1" />
			{/each}
		</g>
	</svg>
</div>

<label class="checkbox">
	<input
		type="checkbox"
		bind:checked={pausar}
		on:change={() => {
			if (pausar) {
				visibleData = [...dataSnapshot];
			}
		}}
	/>
	Restaurar
</label>
