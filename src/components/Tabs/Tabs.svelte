<script lang="ts">
	import NewNameForm from '../NewNameForm/NewNameForm.svelte';
	import SortingForm from '../SortingForm/SortingForm.svelte';
	import Tab from './Tab.svelte';
	import Panel from './Panel.svelte';
	import FilteringForm from '../FilteringForm/FilteringForm.svelte';
	import type { FilterCategory, Parent, SelectedFilters } from '../../types/types';

	type Props = {
		onSortingChange: (value: string) => void;
		selectedSorting?: string;
		selectedFilters: SelectedFilters;
		onFilterChange: (value: Parent | string, category: FilterCategory) => void;
		onFilterClear: () => void;
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

	const tabSelected = $state({ value: 'new-name-tab' });
	const onSelect = (e: Event) => {
		const input = e.target as HTMLInputElement;
		tabSelected.value = input.id;
	};
</script>

<section class="tabs">
	<fieldset class="flex">
		<Tab
			label="Neuer Name"
			onChange={onSelect}
			id="new-name-tab"
			currentValue={tabSelected.value}
		/>

		<Tab label="Sortieren" onChange={onSelect} id="sort-tab" currentValue={tabSelected.value} />

		<Tab label="Filtern" onChange={onSelect} id="filter-tab" currentValue={tabSelected.value} />
	</fieldset>
	<div class="relative h-[144px]">
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
