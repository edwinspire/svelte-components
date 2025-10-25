<script>
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';

	let { title = $bindable('Title'), data = $bindable([]), option = $bindable({}) } = $props();

	var chartDom;
	var myChart;

	$effect(() => {
		//console.log("::::.> Data changed:");
		if (data) {
			//console.log('llega');
			if (myChart) {
				//	console.log('setea');
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
		myChart = echarts.init(chartDom);
		option && myChart.setOption(option);
	});
</script>

<div style="width: 100%; height: 400px;" bind:this={chartDom}></div>
