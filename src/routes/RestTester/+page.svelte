<script>
	import { RESTTester } from '$lib/index.js';
	let markdownContent = '## Hola';
	let data = $state({
    "query": [
        {
            "enabled": false,
            "key": "",
            "value": ""
        }
    ],
    "body": {
        "selection": 0
    },
    "headers": {},
    "auth": {
        "selection": 0
    }
});
</script>

<RESTTester bind:data />
