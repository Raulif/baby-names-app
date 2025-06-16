<script lang="ts">
	import type { FilterStateValue, Parent, FilterCategory } from '../../types/types';
	import Radio from '../Radio/Radio.svelte';
	import ClearButton from '../ClearButton/ClearButton.svelte';

	type Props = {
		onChange: (value: Parent | string, category: FilterCategory) => void;
		valueLabels: Array<{ value: string; label: string }>;
		selectedFilters: FilterStateValue;
		title: string;
		category: FilterCategory;
		onClear: (category: FilterCategory) => void;
	};

	const { onChange, category, valueLabels, selectedFilters, title, onClear }: Props = $props();
</script>

<div class="flex flex-col gap-[6px] pb-3">
	<span class="poppins-regular">{title}</span>
	<div class="flex items-center gap-4">
		{#each valueLabels as valueLabel (valueLabel.value)}
    <Radio 
      name={category}
				value={valueLabel.value}
				label={valueLabel.label}
				onChange={(value) => onChange(value, category)}
        checked={selectedFilters[category] === valueLabel.value}
        />
		{/each}
    <ClearButton
      active={!!selectedFilters[category]}
      ariaLabel={`Filter entfernen für Kategorie: ${category}`}
      onClick={() => onClear(category)}
    />

	</div>
</div>
