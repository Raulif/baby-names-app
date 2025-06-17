<script lang="ts">
	import NewNameForm from '../NewNameForm/NewNameForm.svelte';
	import SortingForm from '../SortingForm/SortingForm.svelte';
	import Tab from './Tab.svelte';
	import Panel from './Panel.svelte';
	import FilteringForm from '../FilteringForm/FilteringForm.svelte';
	import type { FilterCategory, Parent, FilterStateValue } from '../../types/types';
	import clsx from 'clsx';

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
	const panelOpen = $state({ value: true });

	const tabSelected = $state({ value: 'new-name-tab' });
	const onSelect = (input: HTMLInputElement) => {
		tabSelected.value = input.id;
		const label = input.parentElement;
		if (label) {
			lineAttributes.left = label.offsetLeft;
			lineAttributes.width = label.clientWidth;
		}
		panelOpen.value = true
	};
	const onPanelToggle = () => {
		panelOpen.value = !panelOpen.value;
	};
</script>

<section class="tabs z-2 mb-4 px-4">
	<fieldset class="relative flex items-center gap-8 px-3 pb-1">
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
			class="absolute bottom-0 h-[3px] rounded-xl bg-[#b5b4a2] transition-all"
			style={`left: ${lineAttributes.left}px; width: ${lineAttributes.width}px `}
		></div>
		<button onclick={onPanelToggle} class="absolute right-4 flex items-center h-6 w-6 justify-end" aria-label="Panel aufklappen"
			><i
				class={clsx(
					'fa fa-chevron-up transform text-black transition-all',
					panelOpen.value ? 'rotate-180' : 'rotate-0'
				)}
			></i></button
		>
	</fieldset>
	<div class={clsx('grid tansition-all duration-250', panelOpen.value ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
		<div class="overflow-hidden">
			<div class="relative h-[252px] max-h-[252px] rounded-xl bg-white">
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
		</div>
	</div>
</section>
