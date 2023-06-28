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
	//	export let limitData = 2000;
	let showResetButton = false;
    let TimeSelected = 0;

	let TimeSampleSelected = 'FULL';
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

	let TimeSample = [
		{ label: 'FULL', value: 0 },
		{ label: 'YEARS', value: 1000 * 60 * 60 * 24 * 30 * 12 },
		{ label: 'MONTHS', value: 1000 * 60 * 60 * 24 * 30 },
		{ label: 'DAYS', value: 1000 * 60 * 60 * 24 },
		{ label: 'HOURS', value: 1000 * 60 * 60 },
		{ label: 'MINUTES', value: 1000 * 60 },
		{ label: 'SECONDS', value: 1000 },
		{ label: 'MILISECONDS', value: 1 }
	];

	let timeValue = 1;

	let x = d3
		.scaleTime()
		.domain(d3.extent(visibleData, (d) => new Date(d.date)))
		.range([marginLeft, width - marginRight]);

	let y = d3
		.scaleLinear()
		.domain([0, d3.max(visibleData, (d) => d.time)])
		.range([height - marginBottom, marginTop]);

	let line = d3
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

		line = d3
			.line()
			.x((d, i) => x(new Date(d.date)))
			.y((d) => y(d.time))
			.curve(d3.curveCatmullRom.alpha(0.1));

		let GridY = d3
			.axisLeft(y)
			.tickSize(-width + marginLeft + marginRight)
			.tickSizeOuter(1);

		let GridX = d3
			.axisBottom(x)
			.tickSize(-height + marginBottom + marginTop)
			.tickSizeOuter(1)
			.tickFormat(d3.timeFormat('%H:%M:%S.%L'));

		d3.select(gy).call(GridY).selectAll('.tick line').attr('stroke', '#d1d1e0');
		d3.select(gx).call(GridX).selectAll('.tick line').attr('stroke', '#d1d1e0');

		// Agregar cuadrícula
		//	addGrid();
	}

	function updateInternalData() {
		if (refresh) {
			if (TimeSampleSelected == 'FULL') {
				visibleData = [...dataInput];
			} else {
				const now = Date.now();
				const lastHour = now - TimeSampleSelected * timeValue;
				//console.log(now, lastHour);

				//const lastHour = now - 3600000; // 3600000 milisegundos = 1 hora
				//const lastHour = now - 5000; // 1000 milisegundos = 1 second
				visibleData = dataInput.filter((item) => item.date >= lastHour && item.date <= now);
			}
			visibleData = visibleData;
		}
		xy_Axis();
	}

	let updateChart = (event) => {
		//console.log('<<< updateChart >>>', event);
		let extent = event.selection;

		if (!extent) {
			//console.log('extent no existe ++++');
			if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
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
			//console.log(selectedData);
			visibleData = [...selectedData];

			// Obtener el primer valor
			const firstValue = visibleData[0];

			// Obtener el último valor
			const lastValue = visibleData[visibleData.length - 1];
TimeSelected = (new Date(lastValue.date) - new Date(firstValue.date))/1000;

			console.log(
				'Calculo: ',
				firstValue,
				lastValue,
				TimeSelected,
				1 / TimeSelected
			);
		}
	};

	let idleTimeout;
	let idled = () => {
		idleTimeout = null;
	};

	function resetZoom() {
		console.log('Reset', dataSnapshot, visibleData);
		visibleData = [...dataSnapshot];
	}

	onMount(() => {
		brush = d3
			.brushX()
			.extent([
				[marginLeft, marginTop],
				[width - marginRight, height - marginBottom]
			])
			.on('end', updateChart);

		d3.select(brushElement).call(brush);

		TimeSampleSelected = 'FULL';
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
					console.log(dataSnapshot);
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

	<span slot="r02">
		<div class="field has-addons">
			<p class="control">
				<input
					bind:value={timeValue}
					class="input is-small"
					type="number"
					placeholder="Time sample"
				/>
			</p>
			<p class="control">
				<span class="select is-small">
					<select bind:value={TimeSampleSelected}>
						{#each TimeSample as ts}
							<option value={ts.value}>
								{ts.label}
							</option>
						{/each}
					</select>
				</span>
			</p>
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
		<g bind:this={dots} class="dots" fill="white" stroke="currentColor" stroke-width="2.5">
			{#each visibleData as d, i}
				<circle class="dot" key={i} cx={x(new Date(d.date))} cy={y(d.time)} r="1" />
			{/each}
		</g>
	</svg>

	<Level>
		<span slot="l01"
			>Time between selected endpoints: {TimeSelected}ms | Frecuency: {1 / TimeSelected} Hz</span
		>
	</Level>
</div>

<style>
	.tick line {
		stroke: #3cb371 !important;
	}
</style>
