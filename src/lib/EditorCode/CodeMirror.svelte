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

	let _mounted = false;

	onMount(() => {
		_initEditorView(doc ?? '');
		dispatchDocStore(doc ?? '');
	});

	export let view = null;

	/* `doc` is deliberately made non-reactive for not storing a reduntant string
       besides the editor. Also, setting doc to undefined will not trigger an
       update, so that you can clear it after setting one. */
	export let doc;

	/* Set this if you would like to listen to all transactions via `update` event. */
	export let verbose = false;

	/* Cached doc string so that we don't extract strings in bulk over and over. */
	let _docCached = null;

	/* Overwrite the bulk of the text with the one specified. */
	function _setText(text) {
		view.dispatch({
			changes: { from: 0, insert: text }
		});
	}

	const subscribers = new Set();

	export const docStore = writable(null);

	function _reconfigureExtensions() {
		if (view === null) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of(extensions)
		});
	}

	$: _reconfigureExtensions();

	const updateListener = EditorView.updateListener.of((update) => {
		if (update.docChanged) {
			const newDoc = update.state.doc.toString();
			_docCached = newDoc;
			dispatchDocStore(newDoc);
			dispatch('change', { view, update });
		}
	});

	let extensions = [basicSetup, javascript(), updateListener];

	function dispatchDocStore(s) {
		for (const cb of subscribers) {
			cb(s);
		}
	}

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

	onDestroy(() => {
		if (view !== null) {
			view.destroy();
		}
		subscribers.clear();
	});
</script>

<div class="codemirror" bind:this={dom}></div>

<style>
	.codemirror {
		display: contents;
	}
</style>
