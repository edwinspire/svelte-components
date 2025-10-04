<script>
	import { onMount } from 'svelte';

	let {
		class_content = $bindable('is-small'),

		currentChat = $bindable({
			id: 1,
			name: 'Ana Pérez',
			preview: 'Hola, ¿cómo estás?',
			time: '12:30',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			active: true
		}),
		messages = $bindable([
			{ type: 'incoming', sender: 'Ana Pérez', content: 'Hola, ¿cómo estás?', time: '12:30' },
			{ type: 'outgoing', content: '¡Hola! Todo bien, ¿y tú?', time: '12:31', status: 'read' },
			{
				type: 'incoming',
				sender: 'Ana Pérez',
				content: 'Muy bien, gracias. ¿Qué tal el trabajo?',
				time: '12:32'
			},
			{
				type: 'outgoing',
				content: 'Bien, bastante ocupado últimamente. ¿Y tú?',
				time: '12:33',
				status: 'read'
			},
			{
				type: 'incoming',
				sender: 'Ana Pérez',
				content: 'Igual, pero me encanta lo que hago. ¿Tienes planes para el fin de semana?',
				time: '12:34'
			}
		])
	} = $props();
	// Mensaje actual en el input
	let messageInput = $state('');

	let isTyping = false;

	// Referencia al contenedor de mensajes
	let chatMessages;

	// Chat actual seleccionado
	//let currentChat = chats[0];

	// Mensajes del chat

	// Función para enviar un mensaje
	function sendMessage() {
		console.log('Envia mensaje');
		if (messageInput.trim()) {
			console.log('Envia mensaje 2');
			// Añadir mensaje saliente
			messages = [
				...messages,
				{
					type: 'outgoing',
					content: messageInput,
					time: getCurrentTime(),
					status: 'sent'
				}
			];

			// Limpiar input
			messageInput = '';

			// Simular estado de mensaje
			setTimeout(() => {
				const lastMessage = messages[messages.length - 1];
				if (lastMessage.type === 'outgoing') {
					lastMessage.status = 'delivered';
					messages = [...messages];
				}
			}, 1000);

			setTimeout(() => {
				const lastMessage = messages[messages.length - 1];
				if (lastMessage.type === 'outgoing') {
					lastMessage.status = 'read';
					messages = [...messages];
				}
			}, 2000);

			// Simular respuesta después de un tiempo
			setTimeout(() => {
				isTyping = true;

				setTimeout(() => {
					isTyping = false;

					messages = [
						...messages,
						{
							type: 'incoming',
							sender: currentChat.name,
							content: '¡Suena interesante! ¿Qué planes tienes?',
							time: getCurrentTime()
						}
					];
				}, 2000);
			}, 1500);
		}
	}

	// Función para obtener la hora actual formateada
	function getCurrentTime() {
		const now = new Date();
		return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	// Desplazar al final cuando el componente se monta
	onMount(() => {
		if (chatMessages) {
			chatMessages.scrollTop = chatMessages.scrollHeight;
		}
	});

	// Desplazar al final cuando los mensajes cambian

	$effect(() => {
		if (chatMessages) {
			chatMessages.scrollTop = chatMessages.scrollHeight;
		}
	});
</script>

<div class="content">
	<div class="chat-header content">
		<i class="fas fa-arrow-left chat-header-back"></i>
		<div class="chat-header-info">
			<div class="chat-header-name">{currentChat.name}</div>
			<div class="chat-header-status">En línea</div>
		</div>
		<div class="chat-header-actions">
			<i class="fas fa-search"></i>
			<i class="fas fa-phone-alt"></i>
			<i class="fas fa-video"></i>
			<i class="fas fa-ellipsis-h"></i>
		</div>
	</div>

	<div class="" bind:this={chatMessages}>
		{#each messages as message}
			{#if message.type === 'incoming'}
				<div class="is-flex is-justify-content-flex-start padding_msg">
					<span class="box w_message_in content {class_content}">{message.content}</span>
				</div>
			{:else if message.type === 'outgoing'}
				<div class="is-flex is-justify-content-flex-end padding_msg">
					<span class="box w_message_out content {class_content}">{message.content}</span>
				</div>
			{/if}
		{/each}
	</div>

	<div class="content sep">
		<div class="field has-addons">
			<div class="control is-expanded">
				<input class="input" bind:value={messageInput} type="text" placeholder="Message..." />
			</div>
			<div class="control">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="button"
					onclick={(e) => {
						sendMessage();
					}}
				>
					<span class="icon is-small has-text-success">
						<i class="fas fa-paper-plane"></i>
					</span>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.sep {
		padding-top: 1em;
	}

	.chat-header {
		padding: 1rem;

		border-bottom: 1px solid #e0e0e0;
		display: flex;
		align-items: center;
	}

	.chat-header-back {
		margin-right: 1rem;
		color: var(--telegram-blue);
	}

	.chat-header-info {
		flex-grow: 1;
	}

	.w_message_in {
		max-width: 95%;
		border-width: 1px; /* Ancho */
		border-style: solid; /* Estilo (necesario para que se vea el borde) */
		border-color: rgb(152, 3, 3); /* Color */
	}

	.w_message_out {
		max-width: 95%;
		border-width: 1px; /* Ancho */
		border-style: solid; /* Estilo (necesario para que se vea el borde) */
		border-color: rgb(0, 164, 88); /* Color */
	}

	.chat-header-name {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.chat-header-status {
		font-size: 0.8rem;
		color: #666;
	}

	.chat-header-actions {
		display: flex;
		gap: 0.5rem;
	}

	.chat-header-actions i {
		font-size: 1.1rem;
		color: #666;
	}

	.padding_msg {
		padding-bottom: 1em;
	}

	@keyframes typing {
		0%,
		60%,
		100% {
			transform: translateY(0);
		}
		30% {
			transform: translateY(-5px);
		}
	}
</style>
