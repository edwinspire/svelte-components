<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
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

	// Dispatcher para emitir eventos hacia el exterior
	const dispatch = createEventDispatcher();

	// Props públicos
	export let code = '';
	export let left = null;
	export let right = null;
	export let lang = 'json';
	export let showFormat = false;
	export let showSelectLang = false;
	export let isReadOnly = false;
	export let showHiddenButton = true;
	export let showResetButton = false;
	export let showCode = true;

	// Callbacks (opcional). Prefer usar eventos (change) en vez de pasar funciones.
	export let onchange = null; // función opcional

	// Estado interno
	let editorView = null;
	let containerEl;
	let initialized = false;
	let internalCode = '';
	let lastCode = '';
	let formatError = false;

	// Debounce timer para parseo/validación (evita parsear en cada tecla)
	let debounceTimer = null;
	const DEBOUNCE_MS = 350;

	// Mapa de lenguajes para CodeMirror
	const languages = {
		js: javascript(),
		json: json(),
		html: xml(),
		sql: sql(),
		xml: xml(),
		string: [],
		number: []
	};

	// Lista de lenguajes y plugins para Prettier
	const listLangs = [
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
		{ label: 'String', value: 'string', prettier: '', plugins: [] },
		{ label: 'Number', value: 'number', prettier: '', plugins: [] }
	];

	// Derivados simples
	function getPrettierParserFor(langValue) {
		const found = listLangs.find((l) => l.value === langValue);
		return found ? found.prettier : '';
	}

	function getPrettierPluginsFor(langValue) {
		const found = listLangs.find((l) => l.value === langValue);
		return found ? found.plugins : [];
	}

	// -----------------------
	// SINCRONIZACIÓN
	// -----------------------
	// Actualiza internalCode y dispara onchange/dispatch cuando cambia contenido desde editor
	function updateFromEditor(text) {
		internalCode = text;

		if (lang === 'json') {
			try {
				// intentar parsear pero no arrojar hacia UI si está incompleto (se marca formatError)
				const parsed = JSON.parse(text);
				code = parsed;
				formatError = false;
			} catch (err) {
				// JSON inválido: no sobreescribir "code" con texto inválido
				formatError = true;
			}
		} else if (lang === 'number') {
			try {
				const parsed = parseFloat(text);
				code = Number.isNaN(parsed) ? text : parsed;
				//console.log('>>', parsed, text);
				formatError = Number.isNaN(parsed);
			} catch (error) {
				console.log(error);
				formatError = true;
			}
		} else {
			code = text;
			formatError = false;
		}

		// Emitir evento de cambio (para el exterior)
		const payload = { lang, code, typeof: typeof code };
		//console.log(payload);
		if (payload.lang == 'number') {
			if (payload.typeof == 'number' && !Number.isNaN(payload.code)) {
				if (typeof onchange === 'function') onchange(payload);
				dispatch('change', payload);
			}
		} else {
			if (typeof onchange === 'function') onchange(payload);
			dispatch('change', payload);
		}
	}

	// Actualiza el editor cuando la prop "code" cambia desde fuera
	async function updateEditorFromProp(newCode, withFormat = false) {
		if (!editorView) return;

		let text = newCode;
		try {
			if (lang === 'json' && typeof newCode !== 'string') {
				text = JSON.stringify(newCode, null, 2);
			} else if (typeof newCode !== 'string') {
				text = String(newCode);
			}
		} catch (err) {
			console.warn('updateEditorFromProp: error serializing code', err);
		}

		if (withFormat) {
			try {
				const formatted = await formatWithPrettier(text);
				if (!formatted.error) text = formatted.code;
				formatError = !!formatted.error;
			} catch (err) {
				console.warn(err);
				formatError = true;
			}
		}

		const current = editorView.state.doc.toString();
		if (text !== current) {
			const tr = editorView.state.update({
				changes: { from: 0, to: current.length, insert: text }
			});
			editorView.dispatch(tr);
		}
	}

	// -----------------------
	// CodeMirror: extensiones y reconfiguración
	// -----------------------
	function createExtensions() {
		const langExt = languages[lang] || [];

		const extensions = [
			basicSetup,
			Array.isArray(langExt) && langExt.length === 0 ? null : langExt,
			isReadOnly ? EditorState.readOnly.of(true) : null,
			EditorView.updateListener.of((update) => {
				if (update.docChanged) {
					// Debounce para evitar parsear en cada pulsación
					clearTimeout(debounceTimer);
					debounceTimer = setTimeout(() => {
						updateFromEditor(update.state.doc.toString());
					}, DEBOUNCE_MS);
				}
			}),
			oneDark
		];

		return extensions.filter(Boolean);
	}

	function reconfigureExtensions() {
		if (!editorView) return;
		editorView.dispatch({ effects: StateEffect.reconfigure.of(createExtensions()) });
	}

	// -----------------------
	// Inicialización / limpieza
	// -----------------------
	async function initializeEditor() {
		if (!containerEl) return;

		if (editorView) {
			editorView.destroy();
			editorView = null;
		}

		internalCode =
			typeof code === 'string'
				? code
				: lang === 'json'
					? JSON.stringify(code, null, 2)
					: String(code);
		lastCode = internalCode;

		editorView = new EditorView({
			doc: internalCode,
			extensions: createExtensions(),
			parent: containerEl
		});

		// marcar como inicializado después de montado y con contenido inicial
		initialized = true;
	}

	onMount(() => {
		initializeEditor();
	});

	onDestroy(() => {
		if (editorView) {
			editorView.destroy();
			editorView = null;
		}
		clearTimeout(debounceTimer);
	});

	// Reactividad: si cambian propiedades claves, reconfigurar editor o actualizar contenido
	$: if (initialized) {
		reconfigureExtensions();
	}

	$: if (initialized && code !== undefined) {
		// Si code proviene del exterior (y es distinto de lo que tenemos internamente), sincronizar
		const editorText = editorView ? editorView.state.doc.toString() : '';
		const candidateText =
			lang === 'json' && typeof code !== 'string'
				? JSON.stringify(code, null, 2)
				: String(code ?? '');
		if (candidateText !== editorText) {
			updateEditorFromProp(code);
		}
	}

	// -----------------------
	// Helpers: formateo con Prettier
	// -----------------------
	async function formatWithPrettier(text) {
		const parser = getPrettierParserFor(lang);
		const plugins = getPrettierPluginsFor(lang);
		const result = { error: null, code: text };

		if (parser) {
			try {
				const formatted = await Prettier.format(text, {
					parser,
					plugins,
					tabWidth: 2,
					useTabs: false
				});
				result.code = formatted;
			} catch (err) {
				result.error = err;
				console.warn('Prettier error:', err);
			}
		} else if (lang === 'number') {
			try {
				const parsed = parseFloat(text);
				//	console.log('>', parsed);
				if (!Number.isNaN(parsed)) {
					result.code = String(parsed);
				} else {
					result.code = text;
					result.error = 'NAN';
				}
			} catch (err) {
				result.error = err;
				console.warn('Parse error:', err);
			}
		}

		return result;
	}

	async function formatCode() {
		if (!editorView) return;
		const text = editorView.state.doc.toString();
		const formatted = await formatWithPrettier(text);
		if (!formatted.error) {
			const tr = editorView.state.update({
				changes: { from: 0, to: text.length, insert: formatted.code }
			});
			editorView.dispatch(tr);
			formatError = false;
			//console.log('>>>>', text);
			// forzar sincronización
			updateFromEditor(formatted.code);
		} else {
			//	console.log('>>>>', text);

			formatError = true;
		}
	}

	// -----------------------
	// API pública (exported functions)
	// -----------------------
	export function setCode(newCode) {
		alert('EditorCode setCode');
		code = newCode;
	}

	export function getCode() {
		alert('EditorCode getCode');
		try {
			if (!editorView) return code;
			const text = editorView.state.doc.toString();
			if (lang === 'json') return JSON.parse(text);
			return text;
		} catch (err) {
			formatError = true;
			// si JSON inválido retornamos el string
			return editorView ? editorView.state.doc.toString() : code;
		}
	}

	export function reset() {
		if (!editorView) return;
		const text = lastCode;
		const tr = editorView.state.update({
			changes: { from: 0, to: editorView.state.doc.length, insert: text }
		});
		editorView.dispatch(tr);
		updateFromEditor(text);
	}
</script>

{#snippet r01()}
	<span class="field has-addons">
		{#if showSelectLang}
			<p class="control">
				<button disabled={isReadOnly} class="button is-static is-small"> Lang </button>
			</p>
			<p class="control">
				<span class="select is-small {formatError ? 'is-danger' : ' '}">
					<select
						disabled={isReadOnly}
						bind:value={lang}
						onchange={() => {
							//initializeEditor();
						}}
					>
						{#each listLangs as ll}
							<option value={ll.value}>
								{ll.label}
							</option>
						{/each}
					</select>
				</span>
			</p>
		{/if}
		{#if showFormat && getPrettierParserFor(lang).length > 0}
			<p class="control">
				<button
					disabled={isReadOnly}
					class="button is-small {formatError ? 'is-danger' : ' '}"
					onclick={async () => {
						await formatCode();
					}}
				>
					<span class="icon is-small">
						{#if formatError}
							<i class="fa-solid fa-triangle-exclamation"></i>
						{:else}
							<i class="fa-solid fa-check"></i>
						{/if}
					</span>
					<span>Format {!showSelectLang ? lang.toUpperCase() : ''}</span>
				</button>
			</p>
		{:else if showFormat && lang === 'number'}
			<p class="control">
				<button
					disabled={isReadOnly}
					class="button is-small {formatError ? 'is-danger' : ''}"
					onclick={async () => {
						await formatCode();
					}}
				>
					<span class="icon is-small">
						{#if formatError}
							<i class="fa-solid fa-triangle-exclamation"></i>
						{:else}
							<i class="fa-solid fa-check"></i>
						{/if}
					</span>
					<span>Parser {!showSelectLang ? lang.toUpperCase() : ''}</span>
				</button>
			</p>
		{:else}
			<p class="control">
				<button disabled class="button is-small {formatError ? 'is-danger' : ' '}">
					<span class="icon is-small">
						<i class="fa-solid fa-ban"></i>
					</span>
					<span>Format {!showSelectLang ? lang.toUpperCase() : ''}</span>
				</button>
			</p>
		{/if}
	</span>

	<span class="field has-addons">
		{#if showResetButton}
			<p class="control">
				<button
					disabled={isReadOnly}
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
			</p>{/if}

		{#if showHiddenButton}
			<p class="control">
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
			</p>
		{/if}
	</span>
{/snippet}

<Level left={[left]} right={[right, r01]}></Level>

<div class={showCode ? '' : 'is-hidden'}>
	<div bind:this={containerEl}></div>
</div>

<style>
</style>
