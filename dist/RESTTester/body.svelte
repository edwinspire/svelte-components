<script>
	import { onMount } from 'svelte';
	import { EditorCode, Tab } from '../index.js';
	import KeyValue from './key_value/kv.svelte';

	let { data = $bindable({ selection: 0, json: { code: {} }, xml: { code: '' }, text: {} }) } =
		$props();

	//	export let data = { json: {}, xml: {}, text: {} };

	//let fnJSEditor;
	let fileName = $state('');

	let tabList = $state([
		{ label: 'JSON', component: tab_json },
		{ label: 'XML', disabled: true, component: tab_xml },
		{ label: 'Text', disabled: true, component: tab_text },
		{ label: 'Form-Encode', disabled: true, component: tab_form },
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

	function defaultValues() {
		if (!data) {
			data = { selection: 0, json: { code: {} }, xml: { code: '' }, text: {} };
		}

		if (data && data.json == null) {
			data.json = {};
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

		//	console.log('defaultValues >> BODY =>', data);
	}

	onMount(() => {
		defaultValues();
	});
</script>

{#snippet tab_json()}
	<div>
		{#if data && data.json}
			<EditorCode lang="json" bind:code={data.json.code} showFormat={true}></EditorCode>
		{/if}
	</div>
{/snippet}

{#snippet tab_xml()}
	{#if data && data.xml}
		<EditorCode lang="xml" bind:code={data.xml.code}></EditorCode>
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
						<textarea class="textarea is-small" placeholder="Content" bind:value={data.text.value}
						></textarea>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet tab_form()}
	{#if data}
		<div>
			<KeyValue></KeyValue>
		</div>
	{/if}
{/snippet}

{#snippet tab_binary()}
	{#if data}
		<div>
			<div class="file has-name is-small">
				<label class="file-label">
					<input
						class="file-input is-small"
						type="file"
						name="resume"
						onchange={(e) => {
							if (e.target.files.length > 0) {
								fileName = e.target.files[0].name;
							}
						}}
					/>
					<span class="file-cta">
						<span class="file-icon is-small">
							<i class="fas fa-upload"></i>
						</span>
						<span class="file-label"> Choose a file… </span>
					</span>
					<span class="file-name">{fileName}</span>
				</label>
			</div>
		</div>
	{/if}
{/snippet}
{#if data}
	<Tab bind:tabs={tabList} bind:active={data.selection}></Tab>
{/if}
