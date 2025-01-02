<script>
	//import { createEventDispatcher } from 'svelte';
	let {
		classSize = $bindable('is-small'),
		tabs = $bindable([
			{
				label: 'Pictures',
				classIcon: 'fas fa-picture',
				slot: 'picture',
				isActive: false,
				disabled: true
			},
			{ label: 'Calcs', classIcon: 'fas fa-picture', isActive: true },
			{ label: 'Film', classIcon: 'fas fa-film', isActive: false, disabled: true }
		]),
		active = $bindable(0),
		children
	} = $props();
	//export let classSize = 'is-small';
	/*
	export let tabs = [
		{
			label: 'Pictures',
			classIcon: 'fas fa-picture',
			slot: 'picture',
			isActive: false,
			disabled: true
		},
		{ label: 'Calcs', classIcon: 'fas fa-picture',  isActive: true },
		{ label: 'Film', classIcon: 'fas fa-film',  isActive: false, disabled: true }
	];
	*/
	// slot no used
	//	export let active = 0;

	//	const dispatch = createEventDispatcher();

	const withIcons = (currentValue) => currentValue.classIcon && currentValue.classIcon.length > 3;

	//$: active, changeTab();
	$inspect(active).with((type) => {
		if (type === 'update' || type === 'init') {
			changeTab();
		}
	});

	function changeTab() {
		//console.log('changeTab');
		if (tabs) {
			let last_active; // Guarda el ultimo item activo
			let exists_active = false; // Esta variable indica si hay una item activo
			tabs = tabs.map((t, i) => {
				if (t.isActive) {
					last_active = i;
				}

				if (t.disabled) {
					t.isActive = false;
				} else {
					t.isActive = i == active;
				}

				if (!exists_active && t.isActive) {
					exists_active = true;
				}

				return t;
			});

			//console.log(exists_active, last_active);

			if (!exists_active && tabs[last_active]) {
				tabs[last_active].isActive = true;
			}
		}
	}
</script>

<div class="tabs is-boxed {classSize}">
	<ul>
		{#each tabs as item, i}
			<li class={item.isActive ? 'is-active' : ''}>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_missing_attribute -->
				<a
					onclick={() => {
						/*
						tabs = tabs.map((t) => {
							t.isActive = false;
							return t;
						});

						item.isActive = true;
						*/
						active = i;

						changeTab();

						if (!item.disabled) {
							// Solo dispara cuando no está deshabilitado
							console.log({ label: item.label, index: i });
							//dispatch('select',{ label: item.label, index: i });
							onselect({ label: item.label, index: i });
						}
					}}
				>
					{#if item.disabled}
						<span class="icon"><i class="fa-solid fa-ban" aria-hidden="true"></i></span>
						<span>{item.label}</span>
					{:else if tabs.every(withIcons)}
						<span class="icon"><i class={item.classIcon} aria-hidden="true"></i></span>
						<span>{item.label}</span>
					{:else}
						{item.label}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>
{@render children?.()}
