<script>
	import { onMount, SvelteComponentTyped } from 'svelte';
	import { Level } from '../index.js';
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { json } from '@codemirror/lang-json';
	import { html } from '@codemirror/lang-html';
	import { xml } from '@codemirror/lang-xml';
	import { sql } from '@codemirror/lang-sql';

	import prettier from 'prettier';
	import parserBabel from 'prettier/parser-babel';
	import * as prettierPluginBabel from 'prettier/plugins/babel';
	import parserHtml from 'prettier/parser-html';
	import parserPostcss from 'prettier/parser-postcss';

	let editorView;
	let elementParent;

	//	export let code = `Text demo`;
	export let title = 'Editor Code';
	export let lang = 'json';
	export let showFormat = false;
	export let showSelectLang = false;

	let org_code = '';
	let formatError = false;
	let internal_code = '';

	const languages = {
		js: javascript(),
		json: json(),
		html: html(),
		sql: sql(),
		xml: xml()
	};

	$: lang, initializeEditor();
	// $: code, parseCode();

	// Prettier parsers por lenguaje
	const prettierParsers = {
		js: 'babel',
		json: 'json',
		html: 'html',
		xml: 'html'
	};

	export function setCode(code) {
		internal_code = code;
		org_code = code;
		parseCode();
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
	}

	/*
	// Sincronización de cambios de code con el editor
	$: if (editorView && editorView.state.doc.toString() !== code) {
		console.log('>>>> state.update >>>', internal_code, editorView.state.doc.toString());

		const transaction = editorView.state.update({
			changes: { from: 0, to: editorView.state.doc.length, insert: internal_code }
		});

		editorView.dispatch(transaction);
	}
*/
	export function reset() {
		internal_code = org_code;
		parseCode();
	}

	function parseCode() {
		let f = format(internal_code);
		formatError = f.error;
		internal_code = f.code;

		console.log('>>>> parseCode >>>', internal_code);

		if (editorView && editorView.state) {
			const transaction = editorView.state.update({
				changes: { from: 0, to: editorView.state.doc.length, insert: internal_code }
			});

			editorView.dispatch(transaction);
		}
	}

	function initializeEditor() {
		//		console.log('>>>> elementParent', elementParent);

		if (elementParent) {
			if (editorView) editorView.destroy();

			formatCode();

			editorView = new EditorView({
				doc: internal_code,
				extensions: [
					basicSetup,
					languages[lang] ? languages[lang] : [],
					EditorView.updateListener.of((update) => {
						if (update.changes) {
							internal_code = update.state.doc.toString();
							console.log('>>>> updateListener >>>', internal_code);
							//formatCode();
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
		let result = { code: code_without_format, error: false };
		if (lang == 'json') {
			try {
				if (typeof code_without_format === 'object') {
					result.code = JSON.stringify(code_without_format, null, 2);
				} else {
					result.code = JSON.stringify(JSON.parse(code_without_format), null, 2);
				}
			} catch (error) {
				result.error = false;
			}
		}
		console.log('format result > ', result);
		return result;
	}

	onMount(() => {
		initializeEditor();
	});
</script>

<Level>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div slot="l01"><label class="label is-small">{title}</label></div>

	<div slot="r05">
		{#if showSelectLang}
			<div class="field is-horizontal">
				<div class="field-label is-small">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">Language</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control has-icons-left">
							<div class="select is-small {formatError ? 'is-danger' : ''}">
								<select bind:value={lang}>
									<option value="none">None</option>
									<option value="xml">HTML</option>
									<option value="js">JavaScript</option>
									<option value="json">JSON</option>
									<option value="sql">SQL</option>
									<option value="xml">XML</option>
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
		{/if}
	</div>

	<div slot="r01">
		{#if showFormat && lang == 'json'}
			<button
				class="button is-small"
				on:click={async () => {
					await formatCode();
				}}
			>
				Format
			</button>

			<button
				class="button is-small"
				on:click={() => {
					setCode({ hola: 'mundo' });
				}}
			>
				PRUEBA
			</button>

			<button
				class="button is-small"
				on:click={() => {
					//reset();
					console.log(getCode());
				}}
			>
				RESET
			</button>
		{/if}
	</div>
</Level>

<!-- Editor de CodeMirror -->
<div bind:this={elementParent}></div>
