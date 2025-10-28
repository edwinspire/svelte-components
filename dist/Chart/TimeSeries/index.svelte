<script>
	import { onMount } from 'svelte';
	import Chart from '../index.svelte';

	let {
		title = $bindable('Title'),
		data = $bindable([]),
		option = $bindable({
			title: {
				text: title
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
					// Aqui para darle formato al texto del tooltip
					//console.log(params);
					params = params[0];
					var date = new Date(params.name);
					return (
						date.getDate() +
						'/' +
						(date.getMonth() + 1) +
						'/' +
						date.getFullYear() +
						' : ' +
						params.value[1]
					);
				},
				axisPointer: {
					animation: false
				}
			},
			xAxis: {
				type: 'time',
				scale: false,
				interval: 1000 * 60 * 30,
				splitLine: {
					show: true
				},
				splitLine: {
					show: true, // Mostrar líneas de grilla del eje X
					lineStyle: {
						//color: '#e6eaf0', // Color rojo para las líneas verticales
						//width: 1, // Ancho de 2 píxeles
						opacity: 0.2
						//type: 'solid' // Puedes usar 'dashed', 'dotted', 'solid'
					}
				}
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%'],
				lineStyle: {
					//color: '#e6eaf0', // Color rojo para las líneas verticales
					//width: 1, // Ancho de 2 píxeles
					opacity: 0.2
					//type: 'solid' // Puedes usar 'dashed', 'dotted', 'solid'
				},
				splitLine: {
					show: true
				}
			},
			dataZoom: [
				{
					type: 'inside',
					start: 75,
					end: 100
				},
				{
					start: 0,
					end: 20
				}
			],
			series: [
				{
					name: 'Time Data',
					type: 'line',
					showSymbol: false,
					smooth: true,
					data: data,
					large: true
				}
			]
		})
	} = $props();

	/*
	$effect(() => {
		console.log("Data changed:", data);
		if (data) {
			if (myChart) {
				myChart.setOption({
					title: {
						text: title
					},
					series: [
						{
							data: data
						}
					]
				});
			}
		}
	});
	*/

	onMount(() => {
		//
	});
</script>

<Chart bind:title bind:option bind:data></Chart>
