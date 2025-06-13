<script lang="ts">
	import ClearFilterButton from '../ClearFilterButton/ClearFilterButton.svelte';
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
				<ClearFilterButton onClear={onClear} />
			{/if}
		</div>
		<div
			class="grid max-h-[96px] grid-cols-2 flex-col flex-wrap items-start justify-between gap-x-2 gap-y-4 pt-4"
		>
			<SortingRadio
				label="Name A - Z"
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
				label="Name Z - A"
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
