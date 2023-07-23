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
		<p
			class="menu-label"
			on:click={() => {
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
		<li><a>Dashboard</a></li>
		<li><a>Customers</a></li>
	</ul>
	<p class="menu-label">Administration</p>
	<ul class="menu-list">
		<li><a>Team Settings</a></li>
		<li>
			<a class="is-active">Manage Your Team</a>
			<ul>
				<li><a>Members</a></li>
				<li><a>Plugins</a></li>
				<li><a>Add a member</a></li>
			</ul>
		</li>
		<li><a>Invitations</a></li>
		<li><a>Cloud Storage Environment Settings</a></li>
		<li><a>Authentication</a></li>
	</ul>
	<p class="menu-label">Transactions</p>
	<ul class="menu-list">
		<li><a>Payments</a></li>
		<li><a>Transfers</a></li>
		<li><a>Balance</a></li>
	</ul>
</aside>
