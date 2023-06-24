<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
  
    let data = [{ date: Date.now(), time: 123 }];
    export let width = 640;
    export let height = 400;
    export let marginTop = 20;
    export let marginRight = 20;
    export let marginBottom = 30;
    export let marginLeft = 40;
  
    let Svg;
    let gx;
    let gy;
  
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
  
    onMount(() => {
      setInterval(() => {
        data.push({
          date: Date.now(),
          time: Math.floor(Math.random() * 1000) + 1,
        });
        //console.log(data);
        data = data.slice(-50);
      }, 100);
    });
  </script>
  
  <svg
    {width}
    {height}
    bind:this={Svg}
  
  >
    <g bind:this={gx} transform={`translate(0, ${height - marginBottom})`} />
    <g bind:this={gy} transform={`translate(${marginLeft}, 0)`} />
    <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
    <g fill="white" stroke="currentColor" stroke-width="1.5">
      {#each data as d, i}
        <circle key={i} cx={x(new Date(d.date))} cy={y(d.time)} r="1" />
      {/each}
    </g>
  </svg>