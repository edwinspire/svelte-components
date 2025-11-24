<script>
	import { onMount, onDestroy } from 'svelte';
	import { Level } from '../index.js';
	import { EditorState, StateEffect } from '@codemirror/state';
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { json } from '@codemirror/lang-json';
	import { xml } from '@codemirror/lang-xml';
	import { sql } from '@codemirror/lang-sql';
	import { oneDark } from '@codemirror/theme-one-dark';
	import * as Prettier from 'prettier/standalone.js';
	import prettierPluginBabel from 'prettier/plugins/babel.mjs';
	import Estree from 'prettier/plugins/estree.mjs';
	import prettierPluginHtml from 'prettier/plugins/html.mjs';
	import prettierPluginSql from 'prettier-plugin-sql';

	let editorView;
	let elementParent;
	let initialized = false;

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

	let last_code = '';
	let formatError = $state(false);
	let internal_code = '';
	//let timeoutParseOnChange;

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
		//		console.log(p);
		return p;
	});

	$effect(() => {
		if (lang) {
			_reconfigureExtensions();
		}
	});

	$effect(() => {
		if (code) {
			internalOnchange();
		}
	});

	function internalOnchange() {
		//	console.log('HuBO CAMBIOS >>>');
		setCodeEditor(code, false);
		onchange($state.snapshot({ lang: lang, code: code }));
	}

	function checkUpdateCode() {
		let result = false;
		if (lang === 'json') {
			let tmp_internal_code = JSON.stringify(JSON.parse(internal_code));
			let tmp_code = typeof code === 'object' ? JSON.stringify(code) : code;

			if (tmp_internal_code != tmp_code) {
				code = JSON.parse(internal_code);
				internalOnchange();
				result = true;
			}
		} else if (internal_code != code) {
			code = internal_code;
			internalOnchange();
			result = true;
		}
		return result;
	}

	function create_extensions() {
		let languaje_editor = languages[lang] ? languages[lang] : [];
		return [
			basicSetup,
			languaje_editor,
			isReadOnly ? EditorState.readOnly.of(true) : [], // Activar solo lectura si isReadOnly es verdadero
			languaje_editor,
			EditorView.updateListener.of(async (update) => {
				if (update.changes && update.changedRanges.length > 0) {
					internal_code = update.state.doc.toString();

					if (initialized) {
						try {
							checkUpdateCode();
							formatError = false;
						} catch (error) {
							console.warn(error);
							formatError = true;
						}
					}
				}
			}),
			oneDark
		];
	}

	function _reconfigureExtensions() {
		if (editorView != null) {
			editorView.dispatch({
				effects: StateEffect.reconfigure.of(create_extensions())
			});
		}
	}

	//let timeOutonchangeCode;

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
		internal_code = last_code;
		//parseCode();
	}

		async function setCodeEditor(code_value, with_format = false) {
		let text = code_value;
		try {
			text = typeof code_value !== 'string' ? JSON.stringify(code_value, null, 2) : code_value;
		} catch (error) {
			console.warn(error);
		}

		if (with_format) {
			try {
				let formatted_code = await formatter(editorView.state.doc.toString());
				formatError = formatted_code.error;
				text = formatted_code.code;
			} catch (error) {
				console.warn(error);
			}
		}

		//	console.log('setCodeEditor >>>>>> ', text);

		if (editorView && editorView.state && text != editorView.state.doc.toString()) {
			const transaction = editorView.state.update({
				changes: { from: 0, to: editorView.state.doc.length, insert: text }
			});

			editorView.dispatch(transaction);
		}
	}

	async function initializeEditor() {
		// console.log('initializeEditor >>>>>> ', internal_code);
		if (elementParent) {
			if (editorView) {
				editorView.destroy();
				editorView = undefined;
			}

			editorView = new EditorView({
				doc: internal_code,
				extensions: create_extensions(),
				parent: elementParent
			});
			await setCodeEditor(code);
		}
	}

	// Formatear el código
	async function formatCode() {
		if (editorView && editorView.state) {
			try {
				await setCodeEditor(editorView.state.doc.toString(), true);
			} catch (error) {
				console.error($state.snapshot(error));
			}
		}
	}

	// Formatear el código
	async function formatter(code_to_format) {
		let result = { error: undefined, code: code_to_format };

		try {
			result.code =
				typeof code_to_format !== 'string' ? JSON.stringify(code_to_format) : code_to_format;

			if (lang_prettier && lang_prettier.length > 0) {
				let formatted_code = await Prettier.format(result.code, {
					parser: lang_prettier,
					tabWidth: 2, // Indentación de 4 espacios
					useTabs: false, // Usa espacios en lugar de tabulaciones
					plugins: plugings_prettier
				});
				result.error = undefined;
				result.code = formatted_code;
			}
		} catch (error) {
			result.error = error;
			console.warn($state.snapshot(error));
		}
		return result;
	}

	function defaultValues() {
		if (code == null) {
			code = '';
		}
	}

	onMount(async () => {
		defaultValues();
		await initializeEditor();
		initialized = true;
	});

	onDestroy(() => {
		//clearTimeout(timeoutParseOnChange);
		//	clearTimeout(timeOutonchangeCode);
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
									//initializeEditor();
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
	{/if}
{/snippet}

{#snippet r01()}
	{#if showFormat && lang_prettier && lang_prettier.length > 0}
		<button
			class="button is-small is-outlined {formatError ? 'is-danger' : 'is-success'}"
			onclick={async () => {
				await formatCode();
				checkUpdateCode();
			}}
		>
			<span class="icon is-small">
				{#if formatError}
					<i class="fa-solid fa-triangle-exclamation"></i>
				{:else}
					<i class="fa-solid fa-check"></i>
				{/if}
			</span>
			<span>Format {lang}</span>
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
