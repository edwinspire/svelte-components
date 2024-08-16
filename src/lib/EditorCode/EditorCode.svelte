<script>
	import { onMount } from 'svelte';
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

	export let code = `{"var1": 1, "var2": 2, "var3": 3, "var4": 1234567890}`;
	export let title = 'Editor Code';
	export let lang = 'json';
	export let showFormat = true;
	export let showSelectLang = true;

	const languages = {
		none: undefined,
		js: javascript(),
		json: json(),
		html: html(),
		sql: sql(),
		xml: xml()
	};

	$: lang, initializeEditor();

	// Prettier parsers por lenguaje
	const prettierParsers = {
		js: 'babel',
		json: 'json',
		html: 'html',
		xml: 'html'
	};

	// Sincronización de cambios de code con el editor
	$: if (editorView && editorView.state.doc.toString() !== code) {

		const transaction = editorView.state.update({
			changes: { from: 0, to: editorView.state.doc.length, insert: code }
		});
		editorView.dispatch(transaction);
	}

	

	function selectTheme() {
		/*
        var editor = CodeMirror.fromTextArea(elementParent, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
  });
   
  editor.setOption("theme", 'default');
*/
		//	console.log(editorView.mountStyles());
	}

	function initializeEditor() {
		//		console.log('>>>> elementParent', elementParent);

		if (elementParent) {
			if (editorView) editorView.destroy();

			formatCode();

			editorView = new EditorView({
				doc: code,
				extensions: [
					basicSetup,
					languages[lang] ? languages[lang] : [],
					EditorView.updateListener.of((update) => {
						if (update.changes) {
							code = update.state.doc.toString();
						}
					})
				],

				parent: elementParent
			});
		}
	}

	// Formatear el código utilizando Prettier
	 function formatCode() {
	
		if (lang == 'json') {
			try {
				code = JSON.stringify(JSON.parse(code), null, 2);
			} catch (error) {
				console.error(error, code);
				alert('Sintaxis error');
			}
		} 
	
		// console.log(code, prettierParsers[lang], parserBabel, parserHtml, parserPostcss);
		/*
        try {
			const formattedCode = await prettier.format(code, {
				parser: 'babel',
				plugins: [parserBabel],
				singleQuote: true,
				semi: false
			});

			console.log(formattedCode);
		} catch (error) {
			console.log(error);
		}
        */

		/*
		// Actualizar el editor con el código formateado
		const transaction = editorView.state.update({
			changes: { from: 0, to: editorView.state.doc.length, insert: formattedCode.trim() }
		});
		editorView.dispatch(transaction);
        */

		// Actualizar la variable code con el código formateado
		//code = formattedCode.trim();
		/*
		switch (lang) {
			case 'json':
				code = JSON.stringify(code, null, 2);
				break;
			default:
				alert('No implemented');
				break;
		}
		*/
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
						<div class="control">
							<div class="select is-small">
								<select bind:value={lang}>
									<option value="none">None</option>
									<option value="js">JavaScript</option>
									<option value="json">JSON</option>
									<option value="xml">HTML</option>
									<option value="sql">SQL</option>
									<option value="xml">XML</option>
								</select>
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
		{/if}
	</div>
</Level>

<!-- Editor de CodeMirror -->
<div  bind:this={elementParent}></div>

<style>
	
</style>
