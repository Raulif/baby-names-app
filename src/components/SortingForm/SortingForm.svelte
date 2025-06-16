<script lang="ts">
	import ClearButton from '../ClearButton/ClearButton.svelte';
	import Radio from '../Radio/Radio.svelte';

	type Props = {
		onChange: (value: string) => void;
		selectedSorting?: string;
		onClear: () => void;
	};

	const { onChange, selectedSorting, onClear }: Props = $props();
	const sortingOptions = [
		{ value: 'alphabetical-asc', label: 'Name A - Z' },
		{ value: 'alphabetical-desc', label: 'Name Z - A' },
		{ value: 'rating-asc', label: 'Bewertung Aufst.' },
		{ value: 'rating-desc', label: 'Bewertung Abst.' }
	];
</script>

<section class="max-h-[144px] px-4 pt-3">
	<fieldset>
		<div class="flex items-center justify-between">
			<legend class="poppins-bold text-md">Liste sortieren</legend>
			<ClearButton active={!!selectedSorting} label="Entfernen" onClick={onClear} classes="px-2" />
		</div>
		<div class="flex flex-col grid max-h-[96px] gap-x-2 gap-y-4 pt-4">
			{#each sortingOptions as option (option.value)}
				<Radio
					name="list-sorting"
					value={option.value}
					label={option.label}
					checked={selectedSorting === option.value}
					onChange={(value) => onChange(value)}
				/>
			{/each}
		</div>
	</fieldset>
</section>
