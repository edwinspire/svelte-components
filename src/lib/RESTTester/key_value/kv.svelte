<script>
	import { onMount } from 'svelte';
	import { Table, ColumnTypes } from '../../index.js';

	let { data = $bindable() } = $props();

	let columns = {
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: true
				}
			}
		},
		key: { label: 'Key', decorator: { component: ColumnTypes.Auto, props: { editInline: true } } },
		value: {
			label: 'Value',
			decorator: { component: ColumnTypes.Auto, props: { editInline: true } }
		}
	};

	function addRowEmpty() {
		//console.log('addRowEmpty', data);

		if (!data || !Array.isArray(data)) {
			data = [];
			data.push({ enabled: false, key: '', value: '' });
			// alert('add000')
		} else if (
			data &&
			Array.isArray(data) &&
			!data.find((p) => {
				return p.key == '';
			})
		) {
			data.push({ enabled: true, key: '', value: '' });
			//   alert('add111  ' + data.length)
		}

		data = [...data];
	}

	onMount(() => {
		addRowEmpty();
	});
</script>

<Table
	bind:RawDataTable={data}
	{columns}
	ShowNewButton={true}
	ShowDeleteButton={true}
	onnewrow={() => {
		addRowEmpty();
	}}
></Table>
