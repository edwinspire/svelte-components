<script>
	import { Chart } from 'svelte-echarts';

	import { init, use } from 'echarts/core';
    let data = [
      ['2014-06-01', 55.0],
      ['2014-06-02', 55.0],
      ['2014-06-03', 56.0],
      ['2014-06-04', 56.0],
      ['2014-06-05', 57.0],
      ['2014-06-06', 57.0],
      ['2014-06-07', 58.0],
      ['2014-06-08', 58.0],
      ['2014-06-09', 58.0],
      ['2014-06-10', 59.0],
      ['2014-06-11', 59.0],
      ['2014-06-12', 59.0],
      ['2014-06-13', 60.0],
      ['2014-06-14', 60.0],
      ['2014-06-15', 60.0],
      ['2014-06-16', 61.0],
      ['2014-06-17', 61.0],
      ['2014-06-18', 62.0],
      ['2014-06-19', 62.0],
      ['2014-06-20', 62.0],
      ['2014-06-21', 63.0],
      ['2014-06-22', 63.0],
      ['2014-06-23', 63.0],
      ['2014-06-24', 64.0],
      ['2014-06-25', 64.0],
      ['2014-06-26', 65.0],
      ['2014-06-27', 65.0],
      ['2014-06-28', 66.0],
      ['2014-06-29', 66.0],
      ['2014-06-30', 68.0],
      ['2014-07-01', 69.0],
      ['2014-07-02', 70.0],
      ['2014-07-03', 71.0],
      ['2014-07-04', 72.0],
      ['2014-07-05', 74.0],
      ['2014-07-06', 75.0],
      ['2014-07-07', 77.0],
      ['2014-07-08', 78.0],
      ['2014-07-09', 79.0],
      ['2014-07-10', 80.0],
      ['2014-07-11', 82.0],
      ['2014-07-12', 83.0],
      ['2014-07-13', 85.0],
      ['2014-07-14', 86.0],
      ['2014-07-15', 88.0],
      ['2014-07-16', 89.0],
      ['2014-07-17', 90.0],
      ['2014-07-18', 91.0],
      ['2014-07-19', 92.0],
      ['2014-07-20', 93.0],
      ['2014-07-21', 94.0],
      ['2014-07-22', 95.0],
      ['2014-07-23', 96.0],
      ['2014-07-24', 97.0],
      ['2014-07-25', 98.0],
      ['2014-07-26', 99.0],
      ['2014-07-27', 100.0],
      ['2014-07-28', 101.0],
      ['2014-07-29', 102.0],
      ['2014-07-30', 103.0],
      ['2014-07-31', 104.0],
      ['2014-08-01', 105.0],
      ['2014-08-02', 106.0],
      ['2014-08-03', 107.0],
      ['2014-08-04', 108.0],
      ['2014-08-05', 109.0],
      ['2014-08-06', 110.0],
      ['2014-08-07', 111.0],
      ['2014-08-08', 112.0],
      ['2014-08-09', 113.0],
      ['2014-08-10', 114.0],
      ['2014-08-11', 115.0],
      ['2014-08-12', 116.0],
      ['2014-08-13', 117.0],
      ['2014-08-14', 118.0],
      ['2014-08-15', 119.0],
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
          startValue: '2014-06-01'
        },
        {
          type: 'inside'
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
    options = { ...options, xAxis: { data: data.map(item => item[0]) }, series: { ...options.series, data: data.map(item => item[1]) } };
   }, 2000);

});

</script>

<div class="app">
	<Chart {init} {options} />
</div>

<style>
	.app {
		width: 90vw;
		height: 90vh;
	}
</style>
