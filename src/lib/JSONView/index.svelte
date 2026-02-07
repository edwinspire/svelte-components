<script>
	//export let jsonObject = {};
	let { jsonObject = $bindable({}) } = $props();

	function syntaxHighlight(json) {
		if (json === undefined) return '';
		if (typeof json != 'string') {
			json = JSON.stringify(json, undefined, 2);
		}
		if (!json) return '';

		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			}
		);
	}
</script>

<div class="box">
	<pre>{@html syntaxHighlight(jsonObject)}</pre>
</div>

<style>
	pre {
		background-color: transparent;
		padding: 0;
		margin: 0;
		white-space: pre-wrap;
	}
	:global(.string) {
		color: #067d17;
	}
	:global(.number) {
		color: #0b76e0;
	}
	:global(.boolean) {
		color: #d10808;
	}
	:global(.null) {
		color: #929292;
	}
	:global(.key) {
		color: #a31515;
	}
</style>
