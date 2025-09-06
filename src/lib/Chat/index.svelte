
<script>
  import { onMount } from 'svelte';
import Content from './Content.svelte'

// Datos de chats
	let chats = [
		{
			id: 1,
			name: 'Ana Pérez',
			preview: 'Hola, ¿cómo estás?',
			time: '12:30',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			active: true
		},
		{
			id: 2,
			name: 'Grupo de Trabajo',
			preview: 'Carlos: Reunión mañana a las 10:00',
			time: '11:45',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
			active: false
		},
		{
			id: 3,
			name: 'Mamá',
			preview: '¿Vienes a cenar hoy?',
			time: '10:15',
			avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
			active: false
		},
		{
			id: 4,
			name: 'Jorge',
			preview: '¿Viste el partido anoche?',
			time: 'Ayer',
			avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
			active: false
		},
		{
			id: 5,
			name: 'Equipo de Fútbol',
			preview: '¡Felicidades por la victoria!',
			time: 'Lunes',
			avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
			active: false
		}
	];

 
  // Función para obtener la hora actual formateada
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  
/*
  // Función para seleccionar un chat
  function selectChat(chat) {
    // Actualizar estado de chats
    chats = chats.map(c => ({ ...c, active: c.id === chat.id }));
    
    // Actualizar chat actual
    currentChat = chat;
    
    // Limpiar mensajes y mostrar mensaje de bienvenida
    messages = [
      {
        type: 'incoming',
        sender: chat.name,
        content: `¡Hola! ¿En qué puedo ayudarte hoy?`,
        time: getCurrentTime()
      }
    ];
  }
  */

  // Desplazar al final cuando el componente se monta
  onMount(() => {
    
  });


</script>

<style>
  :root {
    --telegram-blue: #0088cc;
    --telegram-light-blue: #e5f5ff;
    --telegram-gray: #f0f0f0;
  }

 

  .sidebar {
    width: 300px;
    background-color: white;
    border-right: 1px solid #e0e0e0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .sidebar-search {
    padding: 0.5rem 1rem;
  }

  .chats-list {
    padding: 0;
    list-style: none;
  }

  .chat-item {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }

  .chat-item:hover {
    background-color: #f0f0f0;
  }

  .chat-item.active {
    background-color: var(--telegram-light-blue);
  }

  .chat-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }

  .chat-info {
    flex-grow: 1;
  }

  .chat-name {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .chat-preview {
    font-size: 0.85rem;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat-time {
    font-size: 0.8rem;
    color: #999;
  }

  .chat-actions {
    display: flex;
    gap: 0.5rem;
  }

  .chat-actions i {
    font-size: 0.9rem;
    color: #666;
  }

  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
  }

  .chat-header {
    padding: 1rem;
    background-color: white;
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

  .chat-messages {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    background-color: white;
  }

  .message {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  .message-sender {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.25rem;
  }

  .message-content {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    max-width: 70%;
    word-wrap: break-word;
  }

  .message-incoming {
    align-items: flex-start;
  }

  .message-incoming .message-content {
    background-color: #e5f5ff;
    border-bottom-right-radius: 0;
  }

  .message-outgoing {
    align-items: flex-end;
  }

  .message-outgoing .message-content {
    background-color: var(--telegram-blue);
    color: white;
    border-bottom-left-radius: 0;
  }

  .message-time {
    font-size: 0.7rem;
    color: #999;
    margin-top: 0.25rem;
  }

  .chat-input {
    padding: 1rem;
    background-color: white;
    border-top: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
  }

  .chat-input-field {
    flex-grow: 1;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    outline: none;
  }

  .chat-input-field:focus {
    border-color: var(--telegram-blue);
    box-shadow: 0 0 0 2px rgba(0, 136, 204, 0.2);
  }

  .chat-input-actions {
    margin-left: 0.5rem;
  }

  .chat-input-actions i {
    font-size: 1.2rem;
    color: #666;
    cursor: pointer;
    margin-left: 0.5rem;
  }

  .chat-input-actions i:hover {
    color: var(--telegram-blue);
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }

  .typing-dot {
    width: 8px;
    height: 8px;
    background-color: #999;
    border-radius: 50%;
    margin: 0 2px;
    animation: typing 1.4s infinite ease-in-out;
  }

  .typing-dot:nth-child(1) {
    animation-delay: 0.2s;
  }

  .typing-dot:nth-child(2) {
    animation-delay: 0.4s;
  }

  .typing-dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-5px);
    }
  }

  .message-status {
    font-size: 0.7rem;
    margin-left: 0.5rem;
    color: #999;
  }

  .message-status i {
    margin-right: 0.25rem;
  }

  .message-status.read {
    color: #666;
  }

  .message-status.sent {
    color: #999;
  }

  .message-status.delivered {
    color: #666;
  }
</style>

<div class="sidebar">
  <div class="sidebar-header">
    <div class="is-flex is-align-items-center">
      <i class="fas fa-search"></i>
      <input class="input is-small is-rounded ml-2" type="text" placeholder="Buscar">
    </div>
  </div>

  <div class="sidebar-search">
    <div class="is-flex is-align-items-center">
      <i class="fas fa-user-plus"></i>
      <span class="ml-2">Nuevo grupo</span>
    </div>
  </div>

  <ul class="chats-list">
    {#each chats as chat}
      <li class="chat-item {chat.active ? 'active' : ''}" on:click={() => selectChat(chat)}>
        <img src={chat.avatar} alt="Avatar" class="chat-avatar">
        <div class="chat-info">
          <div class="chat-name">{chat.name}</div>
          <div class="chat-preview">{chat.preview}</div>
        </div>
        <div class="chat-time">{chat.time}</div>
      </li>
    {/each}
  </ul>
</div>


<Content></Content>