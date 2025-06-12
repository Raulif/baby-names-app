<script lang="ts">
	import SortingRadio from './SortingRadio.svelte';

	type Props = {
		onChange: (value: string) => void;
		selectedSorting?: string;
		onClear: () => void;
	};

	const { onChange, selectedSorting, onClear }: Props = $props();
</script>

<section class="max-h-[144px] px-4 pt-3">
	<fieldset>
		<div class="flex items-center justify-between">
			<legend class="poppins-bold text-md">Liste sortieren</legend>
			{#if selectedSorting}
				<button
					onclick={onClear}
					class="poppins-regular flex items-center gap-2 rounded-2xl bg-violet-800 px-2 text-white"
					><i class="fa fa-xmark"></i>Entfernen</button
				>
			{/if}
		</div>
		<div
			class="grid max-h-[96px] grid-cols-2 flex-col flex-wrap items-start justify-between gap-x-2 gap-y-4 pt-4"
		>
			<SortingRadio
				label="Alfabet. A - Z"
				name="list-sorting"
				value="alphabetical-asc"
				{selectedSorting}
				{onChange}
			/>
			<SortingRadio
				label="Bewertung Aufst."
				name="list-sorting"
				value="rating-asc"
				{selectedSorting}
				{onChange}
			/>
			<SortingRadio
				label="Alfabet. Z - A"
				name="list-sorting"
				value="alphabetical-desc"
				{selectedSorting}
				{onChange}
			/>
			<SortingRadio
				label="Bewertung Abst."
				name="list-sorting"
				value="rating-desc"
				{selectedSorting}
				{onChange}
			/>
		</div>
	</fieldset>
</section>
