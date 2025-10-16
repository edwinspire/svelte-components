<script>
	import Chart from '$lib/Chart/TimeSeries/index.svelte';
	import { onMount } from 'svelte';
	let data = [];

	let now = new Date(2025, 10, 1);
	let oneDay = 24 * 3600 * 1000;
	let value = Math.random() * 1000;

	function randomData() {
		now = new Date(+now + oneDay);
		value = value + Math.random() * 21 - 10;
		return {
			name: now.toString(),
			value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)],
			other: Math.round(value) + 10
		};
	}

	onMount(() => {
		setInterval(function () {
			for (var i = 0; i < 2; i++) {
				data.push(randomData());
			}
		//	console.log(data);

			data = [...data];

		}, 1000);
	});
</script>

<Chart bind:data title="My Chart Title Primero" />
