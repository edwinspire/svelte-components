<script>
	import { Table } from '$lib/index.js';
	let data = [
		{
			name: 'Jssohn',
			age: 30,
			address: { city: 'New York', country: 'USA', list: [1, 2, 3, { name: 'John' }] }
		},
		{
			name: 'Johnmaria',
			age: 30,
			address: { city: 'New York', country: 'USA', list: [1, 2, 3, { name: 'John' }] }
		},
		{
			name: 'pepe',
			age: 30,
			address: { city: 'New York', country: 'USA', list: [1, 2, 3, { name: 'John' }] }
		}
	];

	let columns = [
		{ label: 'Name', key: 'name' },
		{ label: 'Age', key: 'age' },
		{ label: 'Address', key: 'address' }
	];
</script>

<Table label="Input" {columns} bind:RawDataTable={data} />
