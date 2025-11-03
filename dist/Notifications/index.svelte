<script>
	import { notifications_store } from '../class/utils.js';

	//	let Notif = new Notifications();
	let list_notify = [];

	notifications_store.subscribe((value) => {
		//console.log('notifications_store: ', value);
		list_notify = value;
	});
</script>

<div class=" bottom-right">
	{#each list_notify as s}
		{#if !s.hidden}
			<article class="message is-small is-{s.color}">
				{#if s.title}
					<div class="message-header">
						<p>{s.title}</p>
						<button
							class="delete is-small"
							aria-label="delete"
							onclick={() => {
								s.hidden = true;
							}}
						></button>
					</div>
				{/if}
				<div class="message-body">{s.message}</div>
			</article>
		{/if}
	{/each}
</div>

<style>
	.bottom-right {
		max-width: 30%;
		position: fixed;
		right: 1rem; /* Margen derecho */
		bottom: 1rem; /* Margen inferior */
		z-index: 1000; /* Asegura que esté sobre otros elementos */
	}
</style>
