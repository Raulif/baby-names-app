<script lang="ts">
	import clsx from 'clsx';
	type Props = {
		open: boolean | null;
		removeVeto: (e: MouseEvent) => void;
		vetoName: (e: MouseEvent) => void;
		deleteName: (e: MouseEvent) => void;
		vetoFromUser: boolean;
	};
	const { removeVeto, vetoName, deleteName, open, vetoFromUser }: Props = $props();
</script>

<div
	class={clsx(
		'expandable grid transition-all duration-300',
		open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] '
	)}
>
	<div class="overflow-hidden">
		<div class="flex items-center gap-4 pt-2 pb-2">
			{#if vetoFromUser}
				<button
					onclick={removeVeto}
					class="action-button open-sans-regular flex items-center gap-2 rounded-xl px-4 py-1 text-sm text-[#918f8a]"
					><i class="fa fa-ban"></i>Veto entfernen
				</button>
			{:else}
				<button
					onclick={vetoName}
					class="action-button open-sans-regular flex items-center gap-2 rounded-xl px-4 py-1 text-sm text-[#918f8a]"
					><i class="fa fa-ban"></i>Veto
				</button>
			{/if}
			<button
				onclick={deleteName}
				class="action-button-reverse open-sans-regular flex items-center gap-2 rounded-xl px-4 py-1 text-sm text-[#918f8a]"
				><i class="fa fa-trash"></i>Entfernen</button
			>
		</div>
	</div>
</div>
