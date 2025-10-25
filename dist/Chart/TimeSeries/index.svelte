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
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
					// Aqui para darle formato al texto del tooltip
					console.log(params);
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
				}
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%'],
				splitLine: {
					show: true
				}
			},
			dataZoom: [
				{
					type: 'inside',
					start: 0,
					end: 20
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
					data: data
				}
			]
		})
	} = $props();

	var chartDom;
	var myChart;

	$effect(() => {
		//console.log("Data changed:", data);
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

	onMount(() => {
		//
	});
</script>

<Chart bind:title bind:option></Chart>
