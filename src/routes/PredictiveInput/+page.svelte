<script>
	import { PredictiveInput } from '$lib/index.js';
	let {
		freeTyping = $bindable(false),
		placeholder = $bindable('$_VAR_NAME'),
		classIcon = $bindable(''),
		label = $bindable('Application Variable'),
		value = $bindable('hola2'),
		environment = $bindable(''),
		onselect = () => {}
	} = $props();

	let options_app_vars = $state([
		{ name: 'hola1', value: 'hola1', code: 'c1' },
		{ name: 'hola2', value: 'hola2', code: 'c2' },
		{ name: 'hola3', value: 'hola3', code: 'c3' }
	]);

	setInterval(() => {
		value = 'hola3';
	}, 5000);

</script>

<PredictiveInput
	{freeTyping}
	{placeholder}
	{classIcon}
	{label}
	options={options_app_vars}
	bind:selectedValue={value}
	onselect={(selected) => {
		console.log(selected.value);
	}}
></PredictiveInput>

{value}

