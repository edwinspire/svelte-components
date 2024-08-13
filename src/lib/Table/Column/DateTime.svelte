<script>
	export let value;
	export let props;
	export const row = {};
	let DC001 = false;
	import { DateTime } from 'luxon';
	let format = 'yyyy-MM-dd HH:mm:ss';
	let HighlightIsntToday = false;
	let fromFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
let value_formated = '';
let picker;
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
	{#if props && props.editInline}

	<div class="field has-addons">
		<p class="control is-small">
		  <input class="input is-small" type="text" placeholder="input" bind:value={value_formated}>
		</p>
			<button class="button is-small" on:click={()=>{
				
				try {
				 picker.showPicker();
				} catch (error) {
					alert('No soportado');
				}
			}}>
				<span class="icon">
					<i class="fa-regular fa-calendar"></i>
				</span>
			  </button>
	
	  </div>
  
	  <input bind:this={picker} type="datetime-local" >

	{:else}
		{DateTime.fromFormat(value, fromFormat).toLocal().toFormat(format)}
	{/if}
</td>
