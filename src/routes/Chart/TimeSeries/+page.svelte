<script>
	import Chart from '$lib/Chart/TimeSeries/index.svelte';
	let markdownContent = '## Hola';
</script>

<Chart bind:markdown={markdownContent} />
