<script>
	import { EditorCode } from '$lib/index.js';
	let value = '{}';
</script>

<input bind:value />

<EditorCode
	bind:code={value}
	showFormat={true}
	showSelectLang={true}
	isReadOnly={false}
	showResetButton={true}
	onchange={(e) => {
		console.log(e);
	}}
/>
