<script>
	'use strict';
	export let value;
	export const row = {};
	export let props = {};
  
  /*
  {
		ontrue: { label: 'true', iconClass: 'fa-regular fa-square-check', showLabel: false },
		onfalse: { label: 'false', iconClass: 'fa-regular fa-square', showLabel: true }
	};
*/

	//  console.log(option, value);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<td class="has-text-centered" on:click>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span
		class="icon-text"
		on:click={() => {
			value = !value;
		}}
	>
		<span class="icon">
			<i class='fa-regular fa-square-check' />
		</span>
		
    <span>{value}</span>
		
	</span>
</td>
