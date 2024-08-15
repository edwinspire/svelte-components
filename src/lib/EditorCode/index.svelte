<script>
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { Compartment } from '@codemirror/state';
	import { keymap } from '@codemirror/view';
	import { javascript } from '@codemirror/lang-javascript';
	import { json } from '@codemirror/lang-json';
	import { html } from '@codemirror/lang-html';
	import { xml } from '@codemirror/lang-xml';

	import prettier from 'prettier';
	import parserBabel from 'prettier/parser-babel';
	import parserHtml from 'prettier/parser-html';
	import parserPostcss from 'prettier/parser-postcss';

	let jscode = `console.log('Hola, CodeMirror con Svelte');`;
	let editorView;
	let selectedLanguage = 'js';
	let elementParent;

	const languages = {
		javascript: javascript(),
		json: json(),
		html: html(),
		xml: xml()
	};

	// Prettier parsers por lenguaje
	const prettierParsers = {
		javascript: 'babel',
		json: 'json',
		html: 'html',
		xml: 'html'
	};

	function selectTheme() {
		/*
        var editor = CodeMirror.fromTextArea(elementParent, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
  });
   
  editor.setOption("theme", 'default');
*/

		console.log(editorView.mountStyles());
	}

	onMount(() => {
		initializeEditor();
	});

	function initializeEditor() {
		/*
        const state = EditorState.create({
        doc: jscode,
        extensions: [
          basicSetup,
          languageConf.of( languages[selectedLanguage]),
          EditorView.updateListener.of((update) => {
            if (update.changes) {
              jscode = update.state.doc.toString();
            }
          })
        ]
      });
      */

		if (editorView) editorView.destroy();

		editorView = new EditorView({
			doc: jscode,
			extensions: [
				basicSetup,
				languages[selectedLanguage],
				keymap.of(lintKeymap),
				EditorView.updateListener.of((update) => {
					if (update.changes) {
						jscode = update.state.doc.toString();
					}
				})
			],

			parent: elementParent
		});

		console.log('selectedLanguage', selectedLanguage, languages[selectedLanguage]);

		selectTheme();
	}

	// Cambiar el lenguaje del editor
	function changeLanguage(event) {
		selectedLanguage = event.target.value;
		initializeEditor();
	}

	// Formatear el código utilizando Prettier
	function formatCode() {
		const formattedCode = prettier.format(jscode, {
			parser: prettierParsers[selectedLanguage],
			plugins: [parserBabel, parserHtml, parserPostcss],
			singleQuote: true,
			semi: false
		});

		// Actualizar el editor con el código formateado
		const transaction = editorView.state.update({
			changes: { from: 0, to: editorView.state.doc.length, insert: formattedCode.trim() }
		});
		editorView.dispatch(transaction);

		// Actualizar la variable jscode con el código formateado
		jscode = formattedCode.trim();
	}
</script>

<!-- Selector para cambiar el lenguaje del editor -->
<label for="language-select">Selecciona el lenguaje:</label>
<select id="language-select" on:change={changeLanguage}>
	<option value="javascript">JavaScript</option>
	<option value="json">JSON</option>
	<option value="html">HTML</option>
	<option value="xml">XML</option>
</select>

<!-- Editor de CodeMirror -->
<div class="editor" bind:this={elementParent}></div>

<!-- Botones -->
<button on:click={() => (jscode = "console.log('Código actualizado externamente');")}>
	Actualizar código externamente
</button>
<button on:click={formatCode}> Formatear código </button>

<style>
	.editor {
		border: 1px solid #ddd;
		height: 300px;
		margin-top: 10px;
	}
</style>
