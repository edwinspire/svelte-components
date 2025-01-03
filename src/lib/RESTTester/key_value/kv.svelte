<script>
	import { onMount } from 'svelte';
	import { Table, ColumnTypes } from '../../index.js';

	let { data = $bindable() } = $props();

	//export let data = [];
	let columns = {
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.BooleanIcon,
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

	/*
	$inspect(data).with((type) => {
		console.log('lang >>>>>>>>>>>>> ', type);
		if (type === 'update' || type === 'init') {
			
		}
	});
*/
	function addRowEmpty() {
		console.log('addRowEmpty', data);

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
		data = data;
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
	ondeleterow={(e) => {
		//		console.log(e.detail.rows, data);

		if (e.detail.rows && e.detail.rows.length > 0) {
			data = data.filter((item) => {
				return e.detail.rows.find((r) => {
					return r.key != item.key;
				});
			});
		}
	}}
	onnewrow={() => {
		//data.push({ enabled: true, key: '', value: '' });
		addRowEmpty();
	}}
></Table>
