<script>
	export let value;
	export let props;
	export let row = {}; // Required by no user directly
	let DC001 = false;
	import { DateTime } from 'luxon';
	let format = 'yyyy-MM-dd HH:mm:ss';
	let HighlightIsntToday = false;
	let fromFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
let value_formated = '';

if (props) {
		if (props.format) {
			format = props.format;
		}

		if (props.fromFormat) {
			fromFormat = props.fromFormat;
		}

		if (props.highlight_isnt_today) {
			HighlightIsntToday = true;
		}
	}

	function fn_DC01() {
		DC001 =
			HighlightIsntToday &&
			DateTime.fromISO(value).toFormat('yyyy-MM-dd') !== DateTime.local().toFormat('yyyy-MM-dd');

			value_formated = DateTime.fromFormat(value, fromFormat);
		/*
      HighlightIsntToday &&
      !(
        new Date(value).getFullYear() === new Date().getFullYear() &&
        new Date(value).getDate() === new Date().getDate()
      );
      */
		//		console.log(fromFormat);
	}
	$: value, fn_DC01();
</script>

<td on:click class:has-text-danger={DC001}>
		{DateTime.fromFormat(value, fromFormat).toLocal().toFormat(format)}
	
</td>
