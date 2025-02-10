<script>
	import { onMount, onDestroy } from 'svelte';
	import { Level } from '../index.js';
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { json } from '@codemirror/lang-json';
	import { xml } from '@codemirror/lang-xml';
	import { sql } from '@codemirror/lang-sql';
	import { EditorState } from '@codemirror/state';
	import { oneDark } from '@codemirror/theme-one-dark';
	import * as Prettier from 'prettier/standalone.js';
	import prettierPluginBabel from 'prettier/plugins/babel.mjs';
	import Estree from 'prettier/plugins/estree.mjs';
	import prettierPluginHtml from 'prettier/plugins/html.mjs';
	import prettierPluginSql from 'prettier-plugin-sql';

	let editorView;
	let elementParent;

	let {
		code = $bindable(''),
		left,
		right,
		lang = $bindable('json'),
		showFormat = $bindable(true),
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

	let list_langs = $state([
		{ label: 'None', value: 'none', prettier: '', plugins: [] },
		{ label: 'HTML', value: 'html', prettier: 'html', plugins: [prettierPluginHtml] },
		{ label: 'Javascript', value: 'js', prettier: 'babel', plugins: [prettierPluginBabel, Estree] },
		{
			label: 'JSON',
			value: 'json',
			prettier: 'json-stringify',
			plugins: [prettierPluginBabel, Estree]
		},
		{ label: 'SQL', value: 'sql', prettier: 'sql', plugins: [prettierPluginSql] },
		{ label: 'XML', value: 'xml', prettier: 'html', plugins: [prettierPluginHtml] },
		{ label: 'Text', value: 'text', prettier: '', plugins: [] }
	]);

	let lang_prettier = $derived.by(() => {
		let l = 'text';

		let ll = list_langs.find((la) => {
			return la.value == lang;
		});

		if (ll) {
			l = ll.prettier;
		}

		return l;
	});

	let plugings_prettier = $derived.by(() => {
		let p = [];

		let ll = list_langs.find((la) => {
			return la.value == lang;
		});

		if (ll) {
			p = ll.plugins;
		}
		console.log(p);
		return p;
	});

	$inspect(lang).with((type) => {
		if (type === 'update') {
			initializeEditor();
		}
	});

	let timeOutonchangeCode;

	$effect(() => {
		parseCode();
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
	}

	export function reset() {
		internal_code = org_code;
		parseCode();
	}

	function parseCode() {
		org_code = code;
		//let f = format(org_code);

		//formatError = f.error;
		//internal_code = f.code;
		//internal_code = code;
		if (lang === 'json') {
			internal_code = typeof code === 'object' ? JSON.stringify(code) : code;
		} else {
			internal_code = code;
		}

		setCodeEditor(internal_code);
	}

	function setCodeEditor(text) {
		if (editorView && editorView.state && text != editorView.state.doc.toString()) {
			const transaction = editorView.state.update({
				changes: { from: 0, to: editorView.state.doc.length, insert: text }
			});

			editorView.dispatch(transaction);
		}
	}

	function initializeEditor() {
		if (elementParent) {
			if (editorView) {
				editorView.destroy();
				editorView = undefined;
			}

			//			await formatCode();

			let languaje_editor = languages[lang] ? languages[lang] : [];

			editorView = new EditorView({
				doc: internal_code,
				extensions: [
					basicSetup,
					isReadOnly ? EditorState.readOnly.of(true) : [], // Activar solo lectura si isReadOnly es verdadero
					languaje_editor,
					EditorView.updateListener.of(async (update) => {
						if (update.changes && update.changedRanges.length > 0) {
							internal_code = update.state.doc.toString();

							clearTimeout(timeoutParseOnChange);

							timeoutParseOnChange = setTimeout(async () => {
								onchange($state.snapshot({ lang: lang, code: code }));
								//await formatCode();
							}, 750);
						}
					}),
					oneDark
				],

				parent: elementParent
			});

			// console.log(editorView.themeClasses);
		}
	}

	// Formatear el código
	async function formatCode() {
		if (editorView && editorView.state) {
			try {
				if (lang_prettier && lang_prettier.length > 0) {
					let formatted_code = await Prettier.format(editorView.state.doc.toString(), {
						parser: lang_prettier,
						tabWidth: 2, // Indentación de 4 espacios
						useTabs: false, // Usa espacios en lugar de tabulaciones
						plugins: plugings_prettier
					});
					formatError = undefined;
					internal_code = formatted_code + '';
					//console.log(internal_code);
					setCodeEditor(internal_code);
				}
			} catch (error) {
				formatError = error;
				console.warn(error);
			}
		}
	}

	/*
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

		return result;
	}
	*/

	onMount(() => {
		initializeEditor();
	});

	onDestroy(() => {
		clearTimeout(timeoutParseOnChange);
		clearTimeout(timeOutonchangeCode);
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
	{#if showFormat && lang_prettier && lang_prettier.length > 0}
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
<div class={showCode ? '' : 'is-hidden'}>
	<div bind:this={elementParent}></div>
</div>

<style>
</style>
