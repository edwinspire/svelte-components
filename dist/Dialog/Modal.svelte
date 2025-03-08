<script>
	import Modal from '../Modal/Modal.svelte';
	let {
		show = $bindable(false),
		title,
		oncancel,
		onaccept,
		body,
		label_accept = 'ACCEPT',
		label_cancel = 'CANCEL'
	} = $props();
</script>

<Modal bind:show>
	<div class="modal-card">
		<header class="modal-card-head has-background-dark">
			<p class="modal-card-title has-text-white">
				<b>
					{@render title?.()}
				</b>
			</p>
			<button
				class="delete"
				aria-label="close"
				onclick={(e) => {
					show = false;
					if (oncancel) {
						oncancel(e);
					}
				}}
			></button>
		</header>
		<section class="modal-card-body">
			{@render body?.()}
		</section>
		<footer class="modal-card-foot has-background-dark">
			<button
				class="button is-success is-small"
				onclick={(e) => {
					if (onaccept) {
						onaccept(e);
					}
				}}
			>
				{label_accept}
			</button>
			<button
				class="button is-small"
				onclick={(e) => {
					show = false;
					if (oncancel) {
						oncancel(e);
					}
				}}
			>
				{label_cancel}
			</button>
		</footer>
	</div>
</Modal>

<style>
	.modal-card-foot,
	.modal-card-head {
		padding: 10px !important;
	}
	.modal-card-title {
		font-size: 1rem !important;
	}
</style>
