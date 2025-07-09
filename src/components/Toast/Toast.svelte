<script lang="ts">
	import clsx from 'clsx';
	import type { Toast } from '../../types/types';

	type Props = {
		onDismiss: () => void;
	} & Toast;
	const { onDismiss, text, eventType, themeClass }: Props = $props();

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

<article
	role="alert"
	class={clsx(
		'toast-alert mt-0 mr-[auto] mb-[0.2rem] ml-0 flex w-full items-start justify-between rounded-[4px] py-3 pr-3 pl-2',
		themeClass
	)}
>
	<div class="flex">
		<img src="/icon.png" class="h-10 rounded-[6px] p-1" alt="baby icon" />
		<div class="ml-3 flex flex-col text-sm">
			<span class="open-sans-bold">
				{title}
			</span>
			<span class="open-sans-regular">{text}</span>
		</div>
	</div>

	<button
		class="toast-close border-none bg-transparent p-0 text-lg leading-[1rem]"
		onclick={onDismiss}
	>
		<i class="fa fa-xmark"></i>
		<span class="visually-hidden">Schliessen</span>
	</button>
</article>
