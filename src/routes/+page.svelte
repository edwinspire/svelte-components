<script>
	import { Table } from '../lib/index.js';
	let dataTest = [
		{ column1: 12, column2: 34, column3: 'Test' },
		{ column1: 200, column2: 34, column3: 'Test' }
	];
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Table  url="http://localhost" bind:RawDataTable={dataTest} > <span slot="l01">
    NOMBRE DE LA TABLA
</span> 
<span slot="l02">
    <strong>Esta es otra frase</strong>
</span> 
</Table>
