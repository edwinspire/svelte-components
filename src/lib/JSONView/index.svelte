<script>
	export let jsonObject = {};

	function formatJsonForHtmlCode(/** @type {any} */ json) {
		return json
			? JSON.stringify(json && typeof json == 'object', null, 2)
					.replace(/\n/g, '<br/>')
					.replace(/ /g, '&nbsp;')
			: '';
	}
</script>

<div class="box">
	<code class="">
		{@html formatJsonForHtmlCode(jsonObject)}
	</code>
</div>
