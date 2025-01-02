<script>
	import { slide } from 'svelte/transition';
	let showItems = true;

	let menu = [
		{
			main: 'General',
			items: [{ label: 'A' }, { label: 'B', isActive: true }]
		},
		{
			main: 'Inicio',
			items: [{ label: 'Z' }, { label: 'O' }]
		}
	];
</script>

<aside class="menu">
	{#each menu as m}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<p
			class="menu-label"
			onclick={() => {
				showItems = !showItems;
			}}
		>
			{m.main}
		</p>
		<ul class="menu-list">
			{#if showItems}
				{#each m.items as item}
					<!-- svelte-ignore a11y-missing-attribute -->
					<li transition:slide|global>
						<a class={item.isActive ? 'is-active' : ''}>{item.label}</a>
					</li>
				{/each}
			{/if}
		</ul>
	{/each}
</aside>

<aside class="menu">
	<p class="menu-label">General</p>
	<ul class="menu-list">
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Dashboard</a></li>
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Customers</a></li>
	</ul>
	<p class="menu-label">Administration</p>
	<ul class="menu-list">
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Team Settings</a></li>
		<li>
			
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="is-active">Manage Your Team</a>
			<ul>
				<!-- svelte-ignore a11y_missing_attribute -->
				<li><a>Members</a></li>
				<!-- svelte-ignore a11y_missing_attribute -->
				<li><a>Plugins</a></li>
				<!-- svelte-ignore a11y_missing_attribute -->
				<li><a>Add a member</a></li>
			</ul>
		</li>
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Invitations</a></li>
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Cloud Storage Environment Settings</a></li>
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Authentication</a></li>
	</ul>
	<p class="menu-label">Transactions</p>
	<ul class="menu-list">
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Payments</a></li>
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Transfers</a></li>
		<!-- svelte-ignore a11y_missing_attribute -->
		<li><a>Balance</a></li>
	</ul>
</aside>
