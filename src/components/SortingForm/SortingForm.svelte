<script lang="ts">
	import SortingRadio from './SortingRadio.svelte';

	type Props = {
		onChange: (value: string) => void;
		selectedSorting?: string;
	};

	const { onChange, selectedSorting }: Props = $props();
</script>

<section class="max-h-[144px] px-4 pt-3">
	<fieldset>
		<legend class="poppins-bold text-md">Liste sortieren</legend>
		<div
			class="grid max-h-[96px] grid-cols-2 flex-col flex-wrap items-start justify-between gap-x-2 gap-y-4 pt-2"
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
