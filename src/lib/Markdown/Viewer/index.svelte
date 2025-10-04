<script>
	import { marked } from 'marked';

	let { markdown = $bindable(''), content_class = $bindable('') } = $props();

	let container;

	let html_string = $derived.by(() => {
		if (container || markdown) {
			return marked(markdown);
		}
	});
</script>

<div class="content {content_class}">{@html html_string}</div>
