<script>
	import { onMount } from 'svelte';
	import  Chart  from '$lib/Chart/TimeSeries/index.svelte';

	let { idapp = $bindable() } = $props();
	let data = $state([]);
	let title = $derived.by(() => {
		return 'Request ' + data.length;
	});

	function randomData() {
		now = new Date(+now + oneDay);
		value = value + Math.random() * 21 - 10;
		return {
			name: now.toString(),
			value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
		};
	}

	let now = new Date(2025, 9, 3);
	let oneDay = 24 * 3600 * 1000;
	let value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
		data.push(randomData());
	}

	onMount(() => {
		setInterval(function () {
			data.push(randomData());
		//	console.log($state.snapshot(data));
			data = [...data];
		}, 1000);
		//
	});
</script>

<div class="columns">
	<div class="column">
		<Chart title bind:data></Chart>
	</div>
	<div class="column"><Chart title="Segundo"></Chart></div>
</div>
