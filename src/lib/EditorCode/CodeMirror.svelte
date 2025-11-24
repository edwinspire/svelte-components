<!-- The code below is released under public domain. -->

<script context="module">
	import { EditorView, minimalSetup, basicSetup } from 'codemirror';
	import { StateEffect } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	export { minimalSetup, basicSetup };
</script>

<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let dom;

	export let view = null;

	/* `doc` is deliberately made non-reactive for not storing a reduntant string
       besides the editor. Also, setting doc to undefined will not trigger an
       update, so that you can clear it after setting one. */
	export let doc;

	function _reconfigureExtensions() {
		if (view === null) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of(extensions)
		});
	}

	const updateListener = EditorView.updateListener.of((update) => {
		if (update.docChanged) {
			const newDoc = update.state.doc.toString();
			dispatch('change', { view, update });
		}
	});

	let extensions = [basicSetup, javascript(), updateListener];

	$: if (extensions) _reconfigureExtensions();

	// the view will be inited with the either doc (as long as that it is not `undefined`)
	// or the value in docStore once set
	function _initEditorView(initialDoc) {
		if (view !== null) {
			return false;
		}

		view = new EditorView({
			doc: initialDoc,
			extensions,
			parent: dom
			//dispatchTransactions: _editorTxHandler
		});

		return true;
	}
	
	onMount(() => {
		view = null;
		_initEditorView(doc ?? '');
	});

	onDestroy(() => {
		if (view !== null) {
			view.destroy();
		}
	});
</script>

<div class="codemirror" bind:this={dom}></div>

<style>
	.codemirror {
		display: contents;
	}
</style>
