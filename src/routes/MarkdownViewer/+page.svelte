<script>
	import { MarkdownViewer } from '$lib/index.js';
	let markdownContent = '## Hola';
</script>

<MarkdownViewer bind:markdown={markdownContent} />
