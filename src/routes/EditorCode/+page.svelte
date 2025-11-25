<script>
	import { EditorCode } from '$lib/index.js';
	let value = '{}';
</script>

{#snippet right_header()}
	<span>
	 
			<div class="field has-addons">
				<p class="control">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small is-outlined is-warning"
						title="Copy to another environment"
					 
					>
						<span class="icon is-small">
							<i class="fa-solid fa-copy"></i>
						</span>
					</button>
				</p>
				<p class="control">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small is-outlined is-danger"
						title="Delete variable"
						 
					>
						<span class="icon is-small">
							<i class="fa-solid fa-trash"></i>
						</span>
					</button>
				</p>
			</div>
		
	</span>
{/snippet}


<input bind:value />

<EditorCode
	bind:code={value}
	showFormat={true}
	showSelectLang={true}
	isReadOnly={false}
	showResetButton={true}
	right={right_header}
	onchange={(e) => {
		console.log(e);
	}}
/>
