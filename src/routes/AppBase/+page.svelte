<script>
	import { AppBase } from '$lib/index.js';

	let logoText = $state('My Awesome App');

	let menu = $state([
		{
			title: 'General',
			items: [
				{ label: 'Dashboard', icon: 'fas fa-tachometer-alt', onclick: () => console.log('Dashboard clicked') },
				{ label: 'Users', icon: 'fas fa-users', onclick: () => console.log('Users clicked') }
			]
		},
		{
			title: 'Settings',
			items: [
				{
					label: 'System',
					icon: 'fas fa-cog',
					items: [
						{ label: 'Security', icon: 'fas fa-shield-alt', onclick: () => console.log('Security clicked') },
						{ label: 'Notifications', icon: 'fas fa-bell', onclick: () => console.log('Notifications clicked') }
					]
				},
				{ label: 'Profile', icon: 'fas fa-user-circle', onclick: () => console.log('Profile clicked') }
			]
		}
	]);

	let topRightNavBar = $state([snp_user_profile, snp_notifications]);
	let topLeftNavBar = $state([snp_search]);

</script>

{#snippet snp_logo_icon()}
	<i class="fas fa-rocket" style="color: #ff4757;"></i>
{/snippet}

{#snippet snp_search()}
	<div class="field has-addons" style="margin-bottom: 0;">
		<div class="control">
			<input class="input is-small" type="text" placeholder="Search..." />
		</div>
		<div class="control">
			<button class="button is-small is-info">
				<i class="fas fa-search"></i>
			</button>
		</div>
	</div>
{/snippet}

{#snippet snp_notifications()}
	<span class="icon is-clickable mr-3">
		<i class="fas fa-bell"></i>
		<span class="tag is-danger is-rounded" style="position: absolute; top: -5px; right: -5px; font-size: 0.6rem;">3</span>
	</span>
{/snippet}

{#snippet snp_user_profile()}
	<div class="is-flex is-align-items-center is-clickable">
		<span class="mr-2">John Doe</span>
		<figure class="image is-24x24">
			<img class="is-rounded" src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="User avatar" />
		</figure>
	</div>
{/snippet}

<AppBase
	bind:logoText
	logoIcon={snp_logo_icon}
	bind:menu
	bind:topRightNavBar
	bind:topLeftNavBar
>
	<div class="container is-fluid">
		<h1 class="title mt-5">Dashboard Overview</h1>
		<div class="columns is-multiline">
			<div class="column is-3">
				<div class="box has-background-primary has-text-white">
					<p class="subtitle is-6 has-text-white">Total Users</p>
					<p class="title has-text-white">1,234</p>
				</div>
			</div>
			<div class="column is-3">
				<div class="box has-background-info has-text-white">
					<p class="subtitle is-6 has-text-white">Active Sessions</p>
					<p class="title has-text-white">456</p>
				</div>
			</div>
			<div class="column is-3">
				<div class="box has-background-warning has-text-dark">
					<p class="subtitle is-6 has-text-dark">Pending Tasks</p>
					<p class="title has-text-dark">12</p>
				</div>
			</div>
			<div class="column is-3">
				<div class="box has-background-success has-text-white">
					<p class="subtitle is-6 has-text-white">Revenue</p>
					<p class="title has-text-white">$8,900</p>
				</div>
			</div>
		</div>

		<div class="box">
			<h2 class="subtitle">System Status</h2>
			<progress class="progress is-success" value="80" max="100">80%</progress>
			<p>Server performance is optimal.</p>
		</div>

		{#each Array(10) as _, i}
			<div class="box">
				<h3 class="title is-4">Data Section {i + 1}</h3>
				<div class="columns">
					<div class="column">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. 
						   Integer a placerat at, porta vel, euismod a, libero. Suspendisse potenti.</p>
					</div>
					<div class="column">
						<table class="table is-fullwidth is-striped">
							<thead>
								<tr>
									<th>Metric</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>CPU Usage</td>
									<td>{Math.floor(Math.random() * 100)}%</td>
								</tr>
								<tr>
									<td>Memory</td>
									<td>{Math.floor(Math.random() * 32)}GB</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/each}
	</div>
</AppBase>

<style>
	/* Los colores base ahora vienen de AppBase automáticamente */
	
	:global(.box) {
		background-color: var(--topbar-bg) !important; /* Reutilizamos el fondo de topbar para las cajas */
		color: var(--text-primary) !important;
		border: 1px solid var(--border-color) !important;
	}

	:global(.input) {
		background-color: var(--app-bg) !important;
		color: var(--text-primary) !important;
		border-color: var(--border-color) !important;
	}

	:global(.title), :global(.subtitle) {
		color: var(--text-primary) !important;
	}

	:global(.table) {
		background-color: transparent !important;
		color: var(--text-primary) !important;
	}

	:global(.table thead th) {
		color: var(--text-secondary) !important;
	}
</style>


