<script lang="ts">
	import { requestNotificationPermission } from '$lib/push-notifications';
	import ModalButton from '../ModalButton/ModalButton.svelte';

	type Props = {
		showModal: boolean;
	};
	let { showModal = $bindable() }: Props = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	const onBlock = () => {
		showModal = false;
		dialog?.close();
	};
	const onAllow = () => {
		requestNotificationPermission();
		showModal = false;
		dialog?.close();
	};

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
	data-testId="permission-dialog"
>
	<div class="flex flex-col gap-5">
		<div>
			<p class="open-sans-regular text-md text-center text-[#918f8a]">
				Erlaub <span class="open-sans-bold text-lg text-black">
					Benachrichtigungen
				</span>
				um immer informiert zu sein.
			</p>
		</div>
		<div class="flex justify-center gap-3">
			<ModalButton
				testId={`cancel-permission-button`}
				classes=" border-[#918f8a] bg-[#918f8a] text-white"
				onclick={onAllow}
			>
				<i class="fa fa-check"></i>
				<span>Erlauben</span>
			</ModalButton>

			<ModalButton
				testId={`confirm-permission-button`}
				classes="border-[#d68c8a] bg-white text-[#d68c8a]"
				onclick={onBlock}
			>
				<i class="fa fa-xmark"></i>
				<span>Blockieren</span>
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
