<script>
	import { TextArea } from '$lib/index.js';
	let markdownContent = '## Hola';
</script>

<TextArea label="Esta es una buena etiqueta" bind:value={markdownContent} />
