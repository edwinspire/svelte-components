<script>
	import { OpenFusionWebsocketClient } from '$lib/WebSocketClient.js';
	import { onMount } from 'svelte';

	let respuestas = $state([]);

	onMount(() => {
		const wsClient = new OpenFusionWebsocketClient(
			'ws://127.0.0.1:3000/ws/system/websocket/endpoint/prd'
		);
		wsClient.connect();
		wsClient.on('open', () => {
			console.log('WebSocket connected');
			wsClient.subscribe('/endpoint/events');
		});

		wsClient.on('message', (m) => {
			console.log('WebSocket message', m.detail);
			respuestas = [...respuestas, m.detail];
		});
	});
</script>

<div>Hola mundo</div>
Cantidad de mensajes recibidos: {respuestas.length}