<script lang="ts">
	import Foldable from '../Foldable/Foldable.svelte';
	type Props = {
		open: boolean | null;
		removeVeto: (e: MouseEvent) => void;
		vetoName: (e: MouseEvent) => void;
		deleteName: (e: MouseEvent) => void;
		vetoFromUser: boolean;
		deletable: boolean;
		name: string;
	};
	const {
		removeVeto,
		vetoName,
		deleteName,
		open,
		vetoFromUser,
		deletable,
		name
	}: Props = $props();
</script>

<Foldable {open}>
	<div class="flex items-center gap-4 pt-2 pb-3">
		{#if vetoFromUser}
			<button
				onclick={removeVeto}
				class="action-button open-sans-regular flex items-center gap-2 rounded-xl px-4 py-1 text-sm"
			>
				<i class="fa fa-ban"></i>
				Veto entfernen
			</button>
		{:else}
			<button
				data-testid="veto-button-{name}"
				onclick={vetoName}
				class="action-button open-sans-regular flex items-center gap-2 rounded-xl px-4 py-1 text-sm"
			>
				<i class="fa fa-ban"></i>
				Veto
			</button>
		{/if}
		{#if deletable}
			<button
				data-testid="delete-button-{name}"
				onclick={deleteName}
				class="action-button-reverse open-sans-regular flex items-center gap-2 rounded-xl px-4 py-1 text-sm"
			>
				<i class="fa fa-trash"></i>
				Entfernen
			</button>
		{/if}
	</div>
</Foldable>
