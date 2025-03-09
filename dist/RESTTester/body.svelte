<script>
	import { onMount } from 'svelte';
	import { EditorCode, Tab } from '../index.js';
	import KeyValue from './key_value/kv.svelte';
	import FileUpload from '../FileUpload/index.svelte';

	let {
		data = $bindable({
			selection: 0,
			json: { code: {} },
			xml: { code: '' },
			text: {},
			form: {}
		}),
		onchange = () => {}
	} = $props();

	//	export let data = { json: {}, xml: {}, text: {} };

	//let fnJSEditor;
	let fileName = $state('');
	let last_data = $state();

	let tabList = $state([
		{ label: 'JSON', component: tab_json },
		{ label: 'XML', disabled: true, component: tab_xml },
		{ label: 'Text', disabled: true, component: tab_text },
		{ label: 'Form', disabled: false, component: tab_form },
		{ label: 'Form-Encode', disabled: true, component: tab_form_encode },
		{ label: 'Binary', disabled: true, component: tab_binary }
	]);

	//	$: data, defaultValues();

	export function getCode() {
		//    console.log(">> getCode en JS.SVELTE ", );
		//		return fnJSEditor.getCode();
	}

	export function reset() {
		//		fnJSEditor.reset();
	}

	$effect(() => {
		data.selection;
		console.log('Volvio a cambiar');
	});

	function defaultValues() {
		if (!data) {
			data = { selection: 0, json: { code: {} }, xml: { code: '' }, text: {} };
		}

		if (data && data.json == null) {
			data.json = { code: {} };
		}

		if (data && data.json && data.json.code == null) {
			data.json.code = {};
		}

		if (data && data.xml == null) {
			data.xml = {};
		}

		if (data && data.xml && data.xml.code == null) {
			data.xml.code = '';
		}

		if (data && data.text == null) {
			data.text = { value: '' };
		}

		if (data && data.text.value && data.text.value == null) {
			data.text.value = '';
		}

		if (data && data.selection == null) {
			data.selection = 0;
		}

		if (data && data.form == null) {
			data.form = {};
		}

		//	console.log('defaultValues >> BODY =>', data);
	}

	function internalOnChange() {
		/*
		if (!equalObjs(data, last_data)) {
			console.log('internalOnChange >> BODY =>', $state.snapshot(data));
			last_data = { ...data };
			onchange(data);
		}
		*/
		console.log('internalOnChange >> BODY =>', $state.snapshot(data));
		onchange(data);
	}

	onMount(() => {
		defaultValues();
	});
</script>

{#snippet tab_json()}
	<div>
		{#if data && data?.json && data?.json?.code}
			<EditorCode
				lang="json"
				bind:code={data.json.code}
				showFormat={true}
				onchange={() => {
					//					console.log('tab_json body', data.json.code);
					internalOnChange();
				}}
			></EditorCode>
		{/if}
	</div>
{/snippet}

{#snippet tab_xml()}
	{#if data && data.xml}
		<EditorCode
			lang="xml"
			bind:code={data.xml.code}
			onchange={() => {
				internalOnChange();
			}}
		></EditorCode>
	{/if}
{/snippet}

{#snippet tab_text()}
	{#if data}
		<div>
			<div class="field">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label is-small">Content</label>
				<div class="control">
					{#if data && data.text}
						<textarea
							class="textarea is-small"
							placeholder="Content"
							bind:value={data.text.value}
							oninput={() => {
								internalOnChange();
							}}
						></textarea>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet tab_form_encode()}
	{#if data}
		<div>
			<KeyValue></KeyValue>
		</div>
	{/if}
{/snippet}

{#snippet tab_form()}
	{#if data}
		<div>
			<FileUpload
				showUploadButton={false}
				accept={''}
				multiple={true}
				onselect={(file_selected) => {
					data.form = file_selected.FormData;

					internalOnChange();
				}}
			></FileUpload>
		</div>
	{/if}
{/snippet}

{#snippet tab_binary()}
	{#if data}
		<div>
			<FileUpload showUploadButton={false}></FileUpload>
		</div>
	{/if}
{/snippet}
{#if data}
	<Tab
		bind:tabs={tabList}
		active={data.selection}
		onselect={(r) => {
			defaultValues();
			data.selection = r.index;
		}}
	></Tab>
{/if}
