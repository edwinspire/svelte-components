<script>
	import { now } from 'd3';
	export let value;
	export let props;
	export const row = {};
	let DC001 = false;
	import { DateTime } from 'luxon';
	let format = 'yyyy-MM-dd HH:mm:ss';
	let HighlightIsntToday = false;
	let fromFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

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
		/*
      HighlightIsntToday &&
      !(
        new Date(value).getFullYear() === new Date().getFullYear() &&
        new Date(value).getDate() === new Date().getDate()
      );
      */
		console.log(fromFormat);
	}
	$: value, fn_DC01();
</script>

<td on:click class:has-text-danger={DC001}>
	{DateTime.fromFormat(value, fromFormat).toLocal().toFormat(format)}
</td>
