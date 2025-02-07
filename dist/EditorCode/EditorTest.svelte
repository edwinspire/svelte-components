<script>
	import { onMount } from 'svelte'
	import CodeMirror, { basicSetup } from './CodeMirror.svelte'

	// ;)
  onMount(() => {
		const cl = document.body.classList
		if (cl.contains('dark')) {
			cl.remove('dark')
		  return () => void cl.add('dark')
		}
	})
	
	let store
	
	function changeHandler({ detail: {trs} }) {
		const changes = trs.map(tr => tr.changes)
		console.log('change', changes.map(ch => ch.toJSON()))
		if (changes.length > 1) {
			const totalChange = changes.reduce((c1, c2) => c1.compose(c2))
			console.log('totalChange', totalChange.toJSON())
		}
	}
</script>

<p>This is a CodeMirror 6 editor:</p>
<div>
	<CodeMirror doc={'Edit me!\nAnd here is the second line!!'}
							bind:docStore={store}
							extensions={basicSetup}
							on:change={changeHandler}></CodeMirror>
</div>

<p>
	This textarea is bound to the editor!
</p>
<textarea bind:value={$store} rows="6" cols="40"></textarea>

<pre>
You typed ➡️{$store}⬅️</pre>

<em>Last tested on 
	<a href="https://github.com/codemirror/view/tree/6.28.1">
		@codemirror/view@6.28.1</a>.</em>

<style>
	:global(.codemirror) {
		border: 1px solid #ddd;
	}
</style>
