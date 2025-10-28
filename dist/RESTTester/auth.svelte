<script>
	import { onMount } from 'svelte';
	import { Tab } from '../index.js';

	let {
		data = $bindable({
			selection: 0,
			basic: { username: '', password: '' },
			bearer: { token: '' }
		}),
		onchange = () => {}
	} = $props();

	// Variable que apunta a `basic.username` de manera reactiva
	let username = $state(data?.basic?.username || '');
	let password = $state(data?.basic?.password || '');
	let token = $state(data?.bearer?.token || '');

	let tabList = $state([
		{ label: 'None', component: tab_none },
		{ label: 'Basic', component: tab_basic },
		{ label: 'Bearer', component: tab_bearer }
	]);

	$effect(() => {
		data;
		defaultValues();
	});

	$effect(() => {
		username;
		password;
		token;

		data.basic.username = username;
		data.basic.password = password;
		data.bearer.token = token;

		onchange(data);
	});

	function defaultValues() {
		if (data == null) {
			data = { basic: { username: '', password: '' }, bearer: { token: '' } };
		}

		if (data && data.basic == null) {
			data.basic = { username: '', password: '' };
		}

		if (data && data.bearer == null) {
			data.bearer = { token: '' };
		}

		if (data && data.selection == null) {
			data.selection = 0;
		}
	//	console.log('DEFAULT', data);

		username = data.basic.username;
		password = data.basic.password;
		token = data.bearer.token;
	}

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
	{#if data != null}
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
							bind:value={username}
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
							bind:value={password}
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
	{#if data != null}
		<div>
			<div class="field">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label is-small">Token</label>
				<div class="control">
					{#if data && data.bearer}
						<textarea class="textarea is-small" placeholder="Token" bind:value={token}></textarea>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/snippet}

{#if data?.selection != null}
	<Tab
		bind:tabs={tabList}
		bind:active={data.selection}
		onselect={() => {
			//console.log(data);
			data = data; // Sin esta asignación no se estaba refrescando la selección.
		}}
	></Tab>
{/if}
