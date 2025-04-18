<!-- The code below is released under public domain. -->

<script context="module">
	import { EditorView, minimalSetup, basicSetup } from 'codemirror';
	import { ViewPlugin } from '@codemirror/view';
	import { StateEffect } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	import { tags } from '@lezer/highlight';
	export { minimalSetup, basicSetup };
</script>

<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let dom;

	let _mounted = false;
	onMount(() => {
		_mounted = true;
		return () => {
			_mounted = false;
		};
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
			changes: { from: 0, to: view.state.doc.length, insert: text }
		});
	}

	const subscribers = new Set();

	/* And here comes the reactivity, implemented as a r/w store. */
	export const docStore = {
		ready: () => view !== null,
		subscribe(cb) {
			subscribers.add(cb);

			if (!this.ready()) {
				cb(null);
			} else {
				if (_docCached == null) {
					_docCached = view.state.doc.toString();
				}
				cb(_docCached);
			}

			return () => void subscribers.delete(cb);
		},
		set(newValue) {
			if (!_mounted) {
				throw new Error('Cannot set docStore when the component is not mounted.');
			}

			const inited = _initEditorView(newValue);
			if (!inited) _setText(newValue);
		}
	};

	let extensions = [basicSetup, javascript()];

	function _reconfigureExtensions() {
		if (view === null) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of(extensions)
		});
	}

	$: extensions, _reconfigureExtensions();

	function _editorTxHandler(trs, view) {
		view.update(trs);

		if (verbose) {
			dispatch('update', trs);
		}

		let lastChangingTr;
		if ((lastChangingTr = trs.findLast((tr) => tr.docChanged))) {
			_docCached = null;
			if (subscribers.size) {
				dispatchDocStore((_docCached = lastChangingTr.newDoc.toString()));
			}
			dispatch('change', { view, trs });
		}
	}

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
			parent: dom,
			dispatchTransactions: _editorTxHandler
		});

		return true;
	}

	$: if (_mounted && doc !== undefined) {
		const inited = _initEditorView(doc);
		dispatchDocStore(doc);
	}

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
