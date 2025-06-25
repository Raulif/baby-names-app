<script lang="ts">
	import type { Snippet } from 'svelte';
	import ModalButton from '../ModalButton/ModalButton.svelte';
	type Props = {
		showModal: boolean;
		children: Snippet;
		onConfirm: (e: MouseEvent) => void;
		name: string
	};
	let {name,  showModal = $bindable(), children, onConfirm }: Props = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (showModal) dialog?.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	data-testId="delete-dialog-{name}"
>
	<div class="flex flex-col gap-5">
		<div>
			{@render children()}
		</div>
		<div class="flex justify-center gap-3">
			<ModalButton
				testId={`cancel-delete-button-${name}`}
				classes=" border-[#918f8a] bg-white text-[#918f8a]"
				onclick={() => dialog?.close()}
			>
				<i class="fa fa-xmark"></i>
				<span>Nein</span>
			</ModalButton>

			<ModalButton
				testId={`confirm-delete-button-${name}`}
				classes="border-[#d68c8a] bg-[#d68c8a] text-white"
				onclick={onConfirm}
			>
				<i class="fa fa-trash-can"></i>
				<span>Ja</span>
			</ModalButton>
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: 100%;
		border-radius: 0.5rem;
		border: none;
		padding: 0;
		position: relative;
		left: 16px;
		top: 33vh;
		top: 33dvh;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		padding: 1.5em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
