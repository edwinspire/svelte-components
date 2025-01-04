<script>
	import { onMount } from 'svelte';
	import { Tab } from '../index.js';

	let {
		data = $bindable({
			selection: 0,
			basic: { username: '', passsword: '' },
			bearer: { token: '' }
		})
	} = $props();

	//export let data = { basic: {}, bearer: {} };

	let tabList = $state([
		{ label: 'None', component: tab_none },
		{ label: 'Basic', component: tab_basic },
		{ label: 'Bearer', component: tab_bearer }
	]);

	//$: data, defaultValues();

	function defaultValues() {
		if (!data) {
			data = { basic: { username: '', passsword: '' }, bearer: { token: '' } };
		}

		if (data && !data.basic) {
			data.basic = { username: '', passsword: '' };
		}

		if (data && !data.bearer) {
			data.bearer = { token: '' };
		}

		if (data && !data.selection) {
			data.selection = 0;
		}
	}

	$inspect(data).with((type) => {
		//console.log('>>>>>>>>>>>>> ', type);
		if (type === 'init') {
			defaultValues();
		}
	});

	onMount(() => {
		//console.log('onMount >> ', data);
		defaultValues();
	});
</script>

{#snippet tab_none()}
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="label is-small">No Authentication Selected</label>
{/snippet}

{#snippet tab_basic()}
	{#if data }
		<div>
			<div class="field">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label is-small">Username</label>

				{#if data && data.basic}
					<div class="control has-icons-left has-icons-right">
						<input
							class="input is-small"
							type="text"
							placeholder="Username"
							bind:value={data.basic.username}
						/>
						<span class="icon is-small is-left">
							<i class="fa-solid fa-user"></i>
						</span>
					</div>
				{/if}
			</div>

			<div class="field">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label is-small">Password</label>
				{#if data && data.basic}
					<div class="control has-icons-left has-icons-right">
						<input
							class="input is-small"
							type="text"
							placeholder="Password"
							bind:value={data.basic.passsword}
						/>
						<span class="icon is-small is-left">
							<i class="fa-solid fa-key"></i>
						</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}
{/snippet}

{#snippet tab_bearer()}
	{#if data }
		<div>
			<div class="field">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label is-small">Token</label>
				<div class="control">
					{#if data && data.bearer}
						<textarea class="textarea is-small" placeholder="Token" bind:value={data.bearer.token}
						></textarea>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/snippet}

{#if data}
	<Tab bind:tabs={tabList} bind:active={data.selection}></Tab>
{/if}
