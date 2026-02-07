<script>
	import { Table } from '$lib/index.js';
	let data = [
		{
			name: 'Jssohn',
			age: 30,
			address: { city: 'AAA York', country: 'USA', list: [1, 2, 3, { name: 'John' }] },
			date: new Date(),
			ready: true
		},
		{
			name: 'Johnmaria',
			age: 90,
			address: { city: 'ZZZ York', country: 'USA', list: [1, 2, 3, { name: 'John' }] },
			date: new Date('2023-01-12')
		},
		{
			name: 'pepe',
			age: 20,
			address: { city: 'New York', country: 'USA', list: [1, 2, 3, { name: 'John' }] },
			date: new Date()
		}
	];

	
</script>

<Table label="Input"   bind:RawDataTable={data} />
