<script>
	'use strict';
	export let value;
	export let row = {}; // Required by no user directly
	export let props = {};
	let option = 'default';

	let config = {
		icon: {
			true: {
				td_class: 'has-text-centered',
				class: 'icon has-text-success',
				icon: 'fas fa-check'
			},
			false: {
				td_class: 'has-text-centered',
				class: 'icon has-text-danger',
				icon: 'fas fa-times'
			}
		},
		'color-icon': {
			true: {
				td_class: 'has-background-success has-text-white has-text-centered',
				class: 'icon',
				icon: 'fas fa-check'
			},
			false: {
				td_class: 'has-background-danger has-text-white has-text-centered',
				class: 'icon',
				icon: 'fas fa-times'
			}
		}
	};

	if (props && props.option) {
		option = config[props.option];
	} else {
		option = null;
	}
	//  console.log(option, value);
</script>

{#if option}
	<td class={option[value].td_class} on:click>
		<div class="icon-text">
			<span class={option[value].class}>
				<i class={option[value].icon} />
			</span>
		</div>
	</td>
{:else}
	<td class="has-text-centered" on:click>
		{#if props && props.editInline}
			<input type="checkbox" bind:checked={value} />
		{:else}
			<input type="checkbox" bind:checked={value} onclick="return false;" />
		{/if}
	</td>
{/if}
