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
				return 'Name bewertet';
			case 'delete':
				return 'Name gelöscht';
			case 'unveto':
				return 'Veto zurückgezogen';

			default:
				return '';
		}
	});
</script>

<article role="alert">
	<div class="flex">
		<img src="/icon.png" alt="baby icon" />
		<div class="text-sm ml-2 flex flex-col">
			<span class="open-sans-bold">
				{title}
			</span>
			<span class="open-sans-regular">{text}</span>
		</div>
	</div>

	<button class="toast-close text-lg " onclick={onDismiss}>
		<i class="fa fa-xmark"></i>
		<span class="visually-hidden">Schliessen</span>
	</button>
</article>

<style lang="postcss">
	article {
		padding: 0.75rem 0.75rem 0.75rem 0.5rem;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin: 0 auto 0.2rem 0;
		width: 100%;
		color: black;
		color:white;
		background-color: #e6eef0;
		background-color: rgba(0,0,0,0.85);
		/* background-color: #a0b4bc; */
		box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}

	img {
		height: 2.5rem;
	}

	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		line-height: 1;
	}
</style>
