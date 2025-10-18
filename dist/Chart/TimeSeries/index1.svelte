<script>
	import { Chart } from 'svelte-echarts';

	import { init, use } from 'echarts/core';
    let data = [
      ['2014-06-01', 55.0],
      ['2014-06-02', 55.0],
      ['2014-06-03', 56.0],
      ['2014-06-04', 56.0],
      ['2014-08-16', 120.0],
      ['2014-08-17', 121.0]];
	import {
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		VisualMapComponent,
		DataZoomComponent,
		MarkLineComponent
	} from 'echarts/components';
	import { CanvasRenderer } from 'echarts/renderers';

	import { LineChart } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { onMount } from 'svelte';

	use([
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		VisualMapComponent,
		DataZoomComponent,
		MarkLineComponent,
		LineChart,
		CanvasRenderer,
		UniversalTransition
	]);


	let options = {
      title: {
        text: 'Beijing AQI',
        left: '1%'
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        data: data.map(function (item) {
          return item[0];
        })
      },
      yAxis: {},
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
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
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 50,
            color: '#93CE07'
          },
          {
            gt: 50,
            lte: 100,
            color: '#FBDB0F'
          },
          {
            gt: 100,
            lte: 150,
            color: '#FC7D02'
          },
          {
            gt: 150,
            lte: 200,
            color: '#FD0100'
          },
          {
            gt: 200,
            lte: 300,
            color: '#AA069F'
          },
          {
            gt: 300,
            color: '#AC3B2A'
          }
        ],
        outOfRange: {
          color: '#999'
        }
      },
      series: {
        name: 'Beijing AQI',
        type: 'line',
        data: data.map(function (item) {
          return item[1];
        }),
        markLine: {
          silent: true,
          lineStyle: {
            color: '#333'
          },
          data: [
            {
              yAxis: 50
            },
            {
              yAxis: 100
            },
            {
              yAxis: 150
            },
            {
              yAxis: 200
            },
            {
              yAxis: 300
            }
          ]
        }
      }
    }
onMount(() => {
    // Initialize chart after component is mounted
   // init();

   setInterval(() => {
    data.push( [new Date().toISOString(), Math.floor(Math.random() * 400)] );
   // options = { ...options, xAxis: { data: data.map(item => item[0]) }, series: { ...options.series, data: data.map(item => item[1]) } };
  console.log(options);
  
  }, 2000);

});

</script>

<div class="app">
	<Chart {init} bind:options={options} />
</div>

<style>
	.app {
		width: 90vw;
		height: 90vh;
	}
</style>
