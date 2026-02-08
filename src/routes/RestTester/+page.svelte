<script>
	import { RESTTester } from '$lib/index.js';
	let markdownContent = '## Hola';
	let data = $state({
		query: [],
		body: {
			selection: 3,
			json: { code: {} },
			xml: { code: '' },
			text: { value: '' },
			form: [
				{ enabled: true, key: 'claveCertificado', value: '1234567890', type: 1 },
				{ enabled: true, key: 'xml', value: '<xml>Documentoxml</xml>', type: 2 },
				{ enabled: true, key: 'certificado', value: '', type: 3 },
				{ enabled: true, key: 'base64', value: 'true', type: 1 }
			],
			urlencoded: []
		},
		headers: [],
		auth: { selection: 0, basic: { username: '', password: '' }, bearer: { token: '' } },
		last_response: { data: '', sizeKBResponse: -1 }
	});
</script>

<RESTTester bind:data />
