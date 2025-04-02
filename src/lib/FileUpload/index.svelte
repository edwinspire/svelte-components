<script>
	import { Notifications } from '../class/utils.js';
	let {
		label = $bindable(),
		accept = $bindable('.json'),
		url = 'http://localhost:3000/upload',
		multiple = false,
		onselect = () => {},
		onupload = () => {},
		showUploadButton = $bindable(true),
		sizeClass=$bindable('is-small')
	} = $props();

	let notify = new Notifications();
	let statusSend = $state(0); // 0 inicial - 1 ok - 2 error

	let selectedFiles;

	let class_status_upload = $derived.by(() => {
		let s = '';
		switch (statusSend) {
			case 1:
				s = 'is-success';
				break;
			case 2:
				s = 'is-danger';
				break;
			default:
				s = '';
				break;
		}
		return s;
	});

	function createFormData() {
		const formData = new FormData();

		for (let index = 0; index < selectedFiles.length; index++) {
			const f = selectedFiles[index];
			//		console.log('FFFFF: ', f);
			formData.append(f.name, f);
		}

		return formData;
	}

	export async function uploadFile() {
		const response = await fetch(url, {
			method: 'POST',
			body: createFormData()
		});

		return await response.json();
	}
</script>

<div class="field has-addons">
	{#if label != null}
		<p class="control">
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="button is-static {sizeClass} "> {label} </a>
		</p>
	{/if}
	<p class="control file">
		<input
			class="input {sizeClass}"
			type="file"
			{multiple}
			{accept}
			onchange={(event) => {
				//console.log('>>>> ', event.target.files);
				statusSend = 0;
				selectedFiles = event.target.files; // Obten el primer archivo seleccionado
				onselect({ files: selectedFiles, FormData: createFormData() });
			}}
		/>
	</p>

	{#if showUploadButton}
		<p class="control">
			<button
				class="button {sizeClass} {class_status_upload}"
				onclick={async () => {
					statusSend = 0;
					//		alert('Ha hecho click');
					if (selectedFiles) {
						try {
							let result = await uploadFile();
							//console.log('yyyyyyyyy ', result);
							statusSend = 1;
							onupload(result);
						} catch (error) {
							statusSend = 2;
							notify.push({ message: error.message, color: 'danger' });
						}
					} else {
						notify.push({ message: 'Invalid file', color: 'warning' });
					}
				}}
			>
				<span class="icon {sizeClass}">
					<i class="fa-solid fa-upload"></i>
				</span>

				<span> Upload </span>
			</button>
		</p>
	{/if}
</div>
