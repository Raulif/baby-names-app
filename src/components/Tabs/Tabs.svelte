<script lang="ts">
	import NewNameForm from '../NewNameForm/NewNameForm.svelte';
	import SortingForm from '../SortingForm/SortingForm.svelte';
	import Tab from './Tab.svelte';
	import Panel from './Panel.svelte';
	import FilteringForm from '../FilteringForm/FilteringForm.svelte';
	import type { FilterCategory, Parent, FilterStateValue } from '../../types/types';

	type Props = {
		onSortingChange: (value: string) => void;
		selectedSorting?: string;
		selectedFilters: FilterStateValue;
		onFilterChange: (value: Parent | string, category: FilterCategory) => void;
		onFilterClear: (category: FilterCategory) => void;
		onSortingClear: () => void;
	};

	const {
		onSortingChange,
		selectedSorting,
		selectedFilters,
		onFilterChange,
		onFilterClear,
		onSortingClear
	}: Props = $props();

	const lineAttributes = $state({ left: 0, width: 0 });

	const tabSelected = $state({ value: 'new-name-tab' });
	const onSelect = (input: HTMLInputElement) => {
		tabSelected.value = input.id;
		const label = input.parentElement;
		if (label) {
			lineAttributes.left = label.offsetLeft;
			lineAttributes.width = label.clientWidth;
		}
	};
</script>

<section class="tabs px-4 z-2 mb-4">
	<fieldset class="relative flex gap-8 pb-1 px-3">
		<Tab
			label="Neuer Name"
			onChange={onSelect}
			id="new-name-tab"
			currentValue={tabSelected.value}
			selectInitial={true}
		/>

		<Tab label="Sortieren" onChange={onSelect} id="sort-tab" currentValue={tabSelected.value} />

		<Tab label="Filtern" onChange={onSelect} id="filter-tab" currentValue={tabSelected.value} />
		<div
			class="absolute h-[3px] bg-[#b5b4a2] transition-all bottom-0 rounded-xl"
			style={`left: ${lineAttributes.left}px; width: ${lineAttributes.width}px `}
		></div>
	</fieldset>
	<div class="relative h-[252px] max-h-[252px] bg-white rounded-xl">
		<Panel visible={tabSelected.value === 'sort-tab'}>
			<SortingForm onChange={onSortingChange} {selectedSorting} onClear={onSortingClear} />
		</Panel>
		<Panel visible={tabSelected.value === 'filter-tab'}>
			<FilteringForm onChange={onFilterChange} {selectedFilters} onClear={onFilterClear} />
		</Panel>
		<Panel visible={tabSelected.value === 'new-name-tab'}>
			<NewNameForm />
		</Panel>
	</div>
</section>
