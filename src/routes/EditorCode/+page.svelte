<script>
	import { EditorCode } from '$lib/index.js';
	let value = '{}';
</script>

<input bind:value={value} />


<EditorCode bind:code={value}  />
