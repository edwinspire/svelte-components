<script>
	import { Table,DialogModal } from '../lib/index.js';
	let dataTest = [
		{ column1: 12, column2: 34, column3: 'Test' },
		{ column1: 200, column2: 34, column3: 'Test' }
	];
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="field is-grouped is-grouped-multiline">
	<div class="control">
		<div class="tags has-addons">
			<a class="tag is-link">Technology</a>
			<a class="tag is-warning">JS</a>
			<a class="tag is-delete" />
			<a class="tag is-delete" />
		</div>
	</div>
</div>

<Table url="http://localhost" bind:RawDataTable={dataTest}>
	<span slot="l01"> NOMBRE DE LA TABLA </span>
	<span slot="l02">
		<strong>Esta es otra frase</strong>
	</span>
</Table>

<DialogModal
  Show={true}
  on:ok={() => {
  //  showDialogOneField = false;
  }}
>
  <span slot="title">mmmmmmmmm</span>

  <div slot="body">
    <div class="field">
      <label class="label is-small">Small input</label>
      <div class="control">
        <input class="input" type="text" placeholder="input" />
      </div>
    </div>
  </div>
</DialogModal>
