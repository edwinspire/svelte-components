<script>
	import { onMount } from 'svelte';
	import { Tab } from '../index.js';

	export let data;

	let tabList = [{ label: 'None', isActive: true }, { label: 'Basic' }, { label: 'Bearer' }];

	onMount(() => {
		if (!data) {
			data = { basic: {}, bearer: {} };
		}

		if (data && !data.basic) {
			data.basic = {};
		}

		if (data && !data.bearer) {
			data.bearer = {};
		}

		if (data && !data.selection) {
			data.selection = 0;
		}
	});
</script>

{#if data }
	<Tab bind:tabs={tabList} bind:active={data.selection}>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<div class={tabList[0].isActive ? '' : 'is-hidden'}>
			<label class="label is-small">No Authentication Selected</label>
		</div>

		<div class={tabList[1].isActive ? '' : 'is-hidden'}>
			<div class="field">
				<!-- svelte-ignore a11y-label-has-associated-control -->
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
				<!-- svelte-ignore a11y-label-has-associated-control -->
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

		<div class={tabList[2].isActive ? '' : 'is-hidden'}>
			<div class="field">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label is-small">Token</label>
				<div class="control">
					{#if data && data.bearer}
						<textarea class="textarea is-small" placeholder="Token" bind:value={data.bearer.token}
						></textarea>
					{/if}
				</div>
			</div>
		</div>
	</Tab>
{/if}
