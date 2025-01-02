<script>
	let {
		value = $bindable(),
		onclick_cell = () => {},
		row = $bindable(),
		format = 'yyyy-MM-dd HH:mm:ss',
		fromFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
		HighlightIsntToday = false,
		editInline = false,
		css_cell = ''
	} = $props();

	let DC001 = $state(false);
	import { DateTime } from 'luxon';
	let value_formated = $state('');

	function fn_DC01() {
		try {
			DC001 =
				HighlightIsntToday &&
				DateTime.fromISO(value).toFormat('yyyy-MM-dd') !== DateTime.local().toFormat('yyyy-MM-dd');
			value_formated = DateTime.fromFormat(value, fromFormat).toLocal().toFormat(format);
		} catch (error) {
			//console.error(error);
			value_formated = value;
		}
	}

	$inspect(value).with((type) => {
		//console.log('>>>>>>>>>>>>> ', type);
		if (type === 'update' || type === 'init') {
			fn_DC01();
		}
		if (editInline) {
			console.warn('editInline on DateTime isnt enabled.');
		}
	});
</script>

<td onclick={onclick_cell} class:has-text-danger={DC001}>
	{value_formated}
</td>
