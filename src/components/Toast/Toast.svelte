<script lang="ts">
	import type { Toast } from '../../types/types';

	type Props = {
		onDismiss: () => void;
	} & Toast;
	const { onDismiss, text, eventType }: Props = $props();

	const title = $derived.by(() => {
		switch (eventType) {
			case 'new':
				return 'Neuer Name';
			case 'veto':
				return 'Veto angelegt';
			case 'rate':
				return 'Veto zurückgezogen';
			case 'delete':
				return 'Name gelöscht';
			case 'unveto':
				return 'Name bewertet';
			default:
				return '';
		}
	});
</script>

<article role="alert" >
	<div class="flex">
		<img src="/icon.png" alt="baby icon" />
		<div class="text ml-2 flex flex-col">
			<span class="open-sans-bold">
				{title}
			</span>
			<span class="open-sans-regular">{text}</span>
		</div>
	</div>

	<button class="toast-close ml-1 text-xl" onclick={onDismiss}>
		<i class="fa fa-xmark"></i>
		<span class="visually-hidden">Schliessen</span>
	</button>
</article>

<style lang="postcss">
	article {
		padding: 1.5rem 0.75rem;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin: 0 auto 0.5rem auto;
		width: 100%;
		color: black;
		background-color: #e6eef0;
		box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.3);
	}

	img {
		height: 3rem;
	}

	button {
		color: black;
		background: transparent;
		border: 0 none;
		padding: 0;
		line-height: 1;
	}
</style>
