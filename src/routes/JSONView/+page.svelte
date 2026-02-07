<script>
	import { JSONView } from '$lib/index.js';
	let jsonObject = { name: 'John', age: 30, address: { city: 'New York', country: 'USA', list: [1, 2, 3, { name: 'John' }] } };
</script>

<JSONView label="Input" bind:jsonObject={jsonObject} />
