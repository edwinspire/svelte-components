<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	let data = [{ date: Date.now(), time: 123 }];
	export let width = 640;
	export let height = 400;
	export let marginTop = 20;
	export let marginRight = 20;
	export let marginBottom = 30;
	export let marginLeft = 40;
	export let limitData = 200;

	let actualizar = true;
	let Svg;
	let gx;
	let gy;
	let brush;
	let brushElement;
	let internalData = [];
	let pathLine;
	let dots;

	$: x = d3
		.scaleTime()
		.domain(d3.extent(data, (d) => new Date(d.date)))
		.range([marginLeft, width - marginRight]);

	$: y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.time)])
		.range([height - marginBottom, marginTop]);

	$: line = d3
		.line()
		.x((d, i) => x(new Date(d.date)))
		.y((d) => y(d.time))
		.curve(d3.curveCatmullRom.alpha(0.1));

	$: d3.select(gy).call(d3.axisLeft(y));
	$: d3.select(gx).call(d3.axisBottom(x));

	$: data, updateInternalData;
	function updateInternalData() {
		if (actualizar) {
			internalData = [...data];
		}
	}

	let updateChart = (event) => {
		//console.log('<<< updateChart >>>', event);
		let extent = event.selection;

		if (!extent) {
			console.log('extent no existe ++++');
			if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
			x.domain(d3.extent(data, (d) => new Date(d.date)));
		} else {
			/*
			//x.domain([x.invert(extent[0]), x.invert(extent[1])]);
			d3.select('.brush').call(brush.move, null);
			//	console.log(extent, data);

			const [x0, x1] = event.selection; // Obtiene los puntos de inicio y fin de la selección
			const selectedData = data.filter((d) => x(d.date) >= x0 && x(d.date) <= x1); // Filtra los datos dentro de la selección

			// Aquí puedes hacer lo que desees con los datos seleccionados
			console.log(selectedData);
			data = selectedData;
            */

			const [x0, x1] = event.selection; // Obtiene los puntos de inicio y fin de la selección
			const selectedData = data.filter((d) => x(d.date) >= x0 && x(d.date) <= x1); // Filtra los datos dentro de la selección

			// Aquí puedes hacer lo que desees con los datos seleccionados
			console.log(selectedData);
			data = selectedData;

			// x.domain([x.invert(extent[0]), x.invert(extent[1])]);
			d3.select('.brush').call(brush.move, null);
		}
		/*
		// Update axis and circle position
		d3.select(gx).transition().duration(1000).call(d3.axisBottom(x));

		d3.select(dots)
			.selectAll('circle')
			.transition()
			.duration(1000)
			.attr('cx', (d)=> {
                console.log('>>>>>', d);
				//return x(new Date(d.date));
			})
			.attr('cy', function (d) {
                console.log('++++', d);

                //return y(d.time);
			});
*/
	};

	let resetChart = () => {
		x.domain(d3.extent(data, (d) => new Date(d.date)));
		d3.select('.brush').call(brush.move, null);
		d3.select('.line').attr('d', line);
		d3.selectAll('.dot').attr('cx', (d) => x(new Date(d.date)));
	};

	onMount(() => {
		console.log(Svg);

		setInterval(() => {
			if (actualizar) {
				data.push({
					date: Date.now(),
					time: Math.floor(Math.random() * 1000) + 1
				});
				//console.log(data);
				data = data.slice(limitData * -1);
			}
		}, 10);

		brush = d3
			.brushX()
			.extent([
				[marginLeft, marginTop],
				[width - marginRight, height - marginBottom]
			])
			.on('end', updateChart);

		d3.select(brushElement).call(brush);

		/*
		Svg.append('path')
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke', 'currentColor')
			.attr('stroke-width', 1.5)
			.attr('d', line(data));
            */
		/*	
      Svg.append('g')
        .attr('class', 'dots')
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => x(new Date(d.date)))
        .attr('cy', (d) => y(d.time))
        .attr('r', 1)
        .attr('fill', 'white')
        .attr('stroke', 'currentColor')
        .attr('stroke-width', 1.5);
  */

		//   Svg.append('g').attr('class', 'brush').call(brush);
	});

	let idleTimeout;
	let idled = () => {
		idleTimeout = null;
	};
</script>

<svg {width} {height} bind:this={Svg} on:dblclick={resetChart}>
	<g bind:this={gx} transform={`translate(0, ${height - marginBottom})`} />
	<g bind:this={gy} transform={`translate(${marginLeft}, 0)`} />
	<g
		bind:this={brushElement}
		on:end={() => {
			alert('ok');
		}}
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
		d={line(data)}
	/>
	<g bind:this={dots} class="dots" fill="white" stroke="currentColor" stroke-width="1.5">
		{#each data as d, i}
			<circle class="dot" key={i} cx={x(new Date(d.date))} cy={y(d.time)} r="1" />
		{/each}
	</g>
</svg>

<label class="checkbox">
	<input type="checkbox" bind:checked={actualizar} />
	Actualizar
</label>
