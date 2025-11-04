<script>
	import { onMount } from 'svelte';
	import { AppBase, Table } from '$lib/index.js';

	let menu = [
		{
			title: 'OpenFusionAPI',
		
			items: [
				{ label: 'App', icon: ' fa-brands fa-font-awesome ', link: '' },
				{
					label: 'Bashboard',
					icon: ' fa-brands fa-facebook ',
					link: '',					
					onclick: () => {
						alert('Ok');
					}
				},
				{ label: 'Pther', icon: ' fa-brands fa-font-awesome ', link: '', enabled: false }
			]
		}
	];

	onMount(() => {
		//
	});
</script>

{#snippet label1()}
	Data Table
{/snippet}

{#snippet bnt1()}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button class="button">
		<span class="icon is-small">
			<i class="fas fa-bold"></i>
		</span>
	</button>
{/snippet}

<AppBase bind:menu topLeftNavBar={[label1]} topRightNavBar={[bnt1]}>
	<textarea class="textarea" placeholder="e.g. Hello world"></textarea>
	<Table></Table></AppBase>
