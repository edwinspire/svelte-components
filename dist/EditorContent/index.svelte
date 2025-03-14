<script>
	import { onMount } from 'svelte';
	import Level from '../Level/Level.svelte';

	let {
		readOnly = $bindable(true),
		readOnlyButton = $bindable(true),
		onchange = () => {},
		content = undefined,
		urlUploadImages = undefined
	} = $props();

	/**
	 * @type {EditorJS | null}
	 */
	let editor = $state(null);
	/** @type {HTMLElement | null} */
	let editorEl = null;

	export function setContent(content_json) {
		editor.render(content_json);
	}

	function setreadOnly(value) {
		//readOnly = !readOnly;
		editor.readOnly.toggle();
		console.log('Editor readOnly:', editor.readOnly);
	}

	onMount(async () => {
		try {
			//			console.log('Aqui llega');
			const { default: EditorJS } = await import('@editorjs/editorjs');
			const Header = (await import('@editorjs/header')).default;
			const List = (await import('@editorjs/list')).default;
			const Paragraph = (await import('@editorjs/paragraph')).default;
			const Embed = (await import('@editorjs/embed')).default;
			const ImageTool = (await import('@editorjs/image')).default;
			const Table = (await import('@editorjs/table')).default;
			const CodeTool = (await import('@editorjs/code')).default;
			const Quote = (await import('@editorjs/quote')).default;
			const Marker = (await import('@editorjs/marker')).default;
			const InlineCode = (await import('@editorjs/inline-code')).default;
			const Checklist = (await import('@editorjs/checklist')).default;

			//			console.log(EditorJS);
			//			const { default: Header } = await import('@editorjs/header');
			editor = new EditorJS({
				holder: editorEl,
				placeholder: 'Write...',
				autofocus: true,
				readOnly: readOnly,
				onChange: async () => {
					const content = await editor.saver.save();
					//console.log('El contenido ha cambiado:', content);
					onchange(content);
				},
				tools: {
					header: { class: Header, inlineToolbar: true },
					paragraph: { class: Paragraph, inlineToolbar: true },
					list: { class: List, inlineToolbar: true },
					embed: { class: Embed, inlineToolbar: true },
					image: { class: ImageTool, config: { endpoints: { byFile: urlUploadImages } } },
					table: { class: Table, inlineToolbar: true },
					code: { class: CodeTool },
					quote: { class: Quote, inlineToolbar: true },
					marker: { class: Marker },
					inlineCode: { class: InlineCode },
					checklist: { class: Checklist, inlineToolbar: true }
				}
			});

			if (content) {
				setContent(content);
			}
		} catch (error) {
			console.error('Failed to load EditorJS:', error);
		}
	});
</script>

<Level right={[readOnly_Button]}>
	{#snippet readOnly_Button()}
		{#if readOnlyButton}
			<button
				class="button is-small {readOnly ? 'is-danger' : 'is-success'}  is-outlined"
				onclick={() => {
					readOnly = !readOnly;
					setreadOnly(readOnly);
				}}
			>
				<span class="icon is-small">
					{#if readOnly}
						<i class="fa-solid fa-ban"></i>
					{:else}
						<i class="fa-solid fa-pen"></i>
					{/if}
				</span>
				<span>Read Only</span>
			</button>
		{/if}
	{/snippet}
</Level>

<div class="content">
	<div bind:this={editorEl} class="w-full h-full"></div>
</div>

<style>
</style>
