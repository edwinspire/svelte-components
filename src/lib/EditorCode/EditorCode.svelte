<script>
	import { onMount, onDestroy } from 'svelte';
	import { Level } from '../index.js';
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { json } from '@codemirror/lang-json';
	//	import { html } from '@codemirror/lang-html';
	import { xml } from '@codemirror/lang-xml';
	import { sql } from '@codemirror/lang-sql';
	import { EditorState } from '@codemirror/state';

	let editorView;
	let elementParent;

	let {
		code = $bindable(''),
		left,
		right,
		lang = $bindable('json'),
		showFormat = $bindable(false),
		showSelectLang = $bindable(false),
		isReadOnly = $bindable(false),
		showHiddenButton = $bindable(true),
		showResetButton = $bindable(false),
		showCode = $bindable(true),
		onchange = (c) => {}
	} = $props();

	let org_code = '';
	let formatError = $state(false);
	let internal_code = '';
	let timeoutParseOnChange;

	const languages = {
		js: javascript(),
		json: json(),
		html: xml(),
		sql: sql(),
		xml: xml()
	};

	//$: lang, initializeEditor();
	//$: code, parseCode();

	// Prettier parsers por lenguaje
	const prettierParsers = {
		js: 'babel',
		json: 'json',
		html: 'html',
		xml: 'html'
	};

	let list_langs = $state([
		{ label: 'None', value: 'none' },
		{ label: 'HTML', value: 'html' },
		{ label: 'Javascript', value: 'js' },
		{ label: 'JSON', value: 'json' },
		{ label: 'SQL', value: 'sql' },
		{ label: 'XML', value: 'xml' },
		{ label: 'Text', value: 'text' }
	]);

	$inspect(lang).with((type) => {
		//	console.log('lang >>>>>>>>>>>>> ', type);
		if (type === 'update') {
			initializeEditor();
		}
	});

	$inspect(code).with((type) => {
		//console.log('code >>>>>>>>>>>>> ', type);
		if (type === 'init') {
			parseCode();
		}
	});

	export function setCode(new_code) {
		code = new_code;
	}

	export function getCode() {
		try {
			formatError = false;
			if (lang === 'json') {
				return JSON.parse(editorView.state.doc.toString());
			} else {
				return editorView.state.doc.toString();
			}
		} catch (error) {
			formatError = true;
			return editorView.state.doc.toString();
		}

		// return JSON.parse(editorView.state.doc.toString());
	}

	export function reset() {
		internal_code = org_code;
		parseCode();
	}

	function parseCode() {
		org_code = code;
		let f = format(org_code);

		formatError = f.error;
		internal_code = f.code;

		setCodeEditor(internal_code);
	}

	function setCodeEditor(text) {
		//console.log(text);
		if (editorView && editorView.state && text != editorView.state.doc.toString()) {
			const transaction = editorView.state.update({
				changes: { from: 0, to: editorView.state.doc.length, insert: text }
			});

			editorView.dispatch(transaction);
		}
	}

	// Función para alternar entre solo lectura y editable
	function toggleReadOnly() {
		isReadOnly = !isReadOnly;
		initializeEditor(); // Reinicializar el editor con la nueva configuración
	}

	function initializeEditor() {
		if (elementParent) {
			if (editorView) editorView.destroy();

			formatCode();

			editorView = new EditorView({
				doc: internal_code,
				extensions: [
					basicSetup,
					isReadOnly ? EditorState.readOnly.of(true) : [], // Activar solo lectura si isReadOnly es verdadero
					languages[lang] ? languages[lang] : [],
					EditorView.updateListener.of(async (update) => {
						if (update.changes && update.changedRanges.length > 0) {
							//	console.log(update.changedRanges);

							internal_code = update.state.doc.toString();

							clearTimeout(timeoutParseOnChange);

							timeoutParseOnChange = setTimeout(() => {
								//console.warn(editorView.state.doc.toString());
								//								console.log('Hubo cambios > timeoutParseOnChange ');
								//setCodeEditor(internal_code);
								formatCode();

								if (!formatError) {
									try {
										if (lang === 'json') {
											code = JSON.parse(internal_code);
										} else {
											code = internal_code;
										}
										onchange({ lang: lang, code: code });
										parseCode();
									} catch (error) {
										console.log(error);
									}
								}
							}, 750);
						}
					})
				],

				parent: elementParent
			});
		}
	}

	// Formatear el código
	function formatCode() {
		if (editorView && editorView.state) {
			let f = format(editorView.state.doc.toString());
			formatError = f.error;
			internal_code = f.code;
		}
	}

	function format(code_without_format) {
		let result = { code: code_without_format, error: undefined };
		if (lang == 'json') {
			try {
				if (typeof code_without_format === 'object') {
					result.code = JSON.stringify(code_without_format, null, 2);
				} else {
					result.code = JSON.stringify(JSON.parse(code_without_format), null, 2);
				}
			} catch (error) {
				result.error = error;
			}
		} else {
			result.code =
				typeof code_without_format !== 'string'
					? JSON.stringify(code_without_format)
					: code_without_format;
		}
		//		console.log('format result > ', result);
		return result;
	}

	onMount(() => {
		initializeEditor();
	});

	onDestroy(() => {
		clearTimeout(timeoutParseOnChange);
	});
</script>

{#snippet l02()}
	{#if showSelectLang}
		<div class="field is-horizontal">
			<div class="field-label is-small">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label">Language</label>
			</div>
			<div class="field-body">
				<div class="field is-narrow">
					<div class="control has-icons-left">
						<div class="select is-small {formatError ? 'is-danger' : ''}">
							<select
								bind:value={lang}
								onchange={() => {
									initializeEditor();
								}}
							>
								{#each list_langs as ll}
									<option value={ll.value}>
										{ll.label}
									</option>
								{/each}
							</select>

							<span class="icon is-small is-left">
								{#if formatError}
									<i class="fa-solid fa-triangle-exclamation"></i>
								{/if}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="control">
			<div class="tags has-addons">
				<span class="tag is-dark">Format</span>
				<span class="tag {formatError ? 'is-danger' : 'is-success'}">{lang}</span>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet r01()}
	{#if showFormat && lang == 'json'}
		<button
			class="button is-small"
			onclick={async () => {
				await formatCode();
			}}
		>
			Format
		</button>
	{/if}

	{#if showResetButton}
		<button
			class="button is-small"
			onclick={() => {
				reset();
				//console.log(code);
			}}
		>
			<span class="icon is-small">
				<i class="fa-solid fa-rotate-left"></i>
			</span>
			<span>Reset</span>
		</button>
	{/if}

	{#if showHiddenButton}
		<button
			title="Hide or show Code"
			class="button is-small"
			onclick={() => {
				showCode = !showCode;
			}}
		>
			<span class="icon is-small">
				{#if showCode}
					<i class="fa-solid fa-eye-slash"></i>
				{:else}
					<i class="fa-solid fa-eye"></i>
				{/if}
			</span>
		</button>
	{/if}
{/snippet}

<Level left={[left, l02]} right={[right, r01]}></Level>

<!-- Editor de CodeMirror -->
<div bind:this={elementParent} class={showCode ? '' : 'is-hidden'}></div>
