<script>
	import { onMount } from 'svelte';
	import { EditorCode, Tab } from '../index.js';

	import KeyValue from './key_value/kv.svelte';

	export let data = { json: {}, xml: {}, text: {} };

//let fnJSEditor;
	let fileName = '';

	let tabList = [
		{ label: 'JSON', isActive: true },
		{ label: 'XML', disabled: true },
		{ label: 'Text', disabled: true },
		{ label: 'Form-Encode', disabled: true },
		{ label: 'Binary', disabled: true }
	];

	$: data, defaultValues();

	export function getCode() {
		//    console.log(">> getCode en JS.SVELTE ", );
//		return fnJSEditor.getCode();
	}

	export function reset() {
//		fnJSEditor.reset();
	}

	function defaultValues() {
		if (!data) {
			data = { js: {}, xml: {}, text: {} };
		}

		if (data && !data.json) {
			data.json = {};
		}

		if (data && !data.xml) {
			data.xml = {};
		}

		if (data && !data.text) {
			data.text = {};
		}

		if (data && !data.selection) {
			data.selection = 0;
		}
	}

	onMount(() => {
		defaultValues();
	});
</script>

{#if data}
	<Tab bind:tabs={tabList} bind:active={data.selection}>
		<div class={tabList[0].isActive ? '' : 'is-hidden'}>
			{#if data && data.json}
				<EditorCode lang="json" bind:code={data.json.code}></EditorCode>
			{/if}
		</div>

		<div class={tabList[1].isActive ? '' : 'is-hidden'}>
			{#if data && data.xml}
				<EditorCode lang="xml" bind:code={data.xml.code}></EditorCode>
			{/if}
		</div>

		<div class={tabList[2].isActive ? '' : 'is-hidden'}>
			<div class="field">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label is-small">Content</label>
				<div class="control">
					{#if data && data.text}
						<textarea class="textarea is-small" placeholder="Content" bind:value={data.text.value}
						></textarea>
					{/if}
				</div>
			</div>
		</div>

		<div class={tabList[3].isActive ? '' : 'is-hidden'}>
			<KeyValue></KeyValue>
		</div>

		<div class={tabList[4].isActive ? '' : 'is-hidden'}>
			<div class="file has-name is-small">
				<label class="file-label">
					<input
						class="file-input is-small"
						type="file"
						name="resume"
						on:change={(e) => {
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
	</Tab>
{/if}
