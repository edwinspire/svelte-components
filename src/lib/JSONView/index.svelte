<script>
	export let jsonObject = {};

	function formatJsonForHtmlCode(/** @type {any} */ json) {
		return JSON.stringify(json, null, 2).replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
	}
</script>

<div class="box">
	<code class="">
		{#if jsonObject && typeof jsonObject == 'object'}
			{@html formatJsonForHtmlCode(jsonObject)}
		{:else}
			{jsonObject}
		{/if}
	</code>
</div>
