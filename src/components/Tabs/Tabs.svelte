<script lang="ts">
	import clsx from 'clsx';
	import NewNameForm from '../NewNameForm/NewNameForm.svelte';
	import SortingForm from '../SortingForm/SortingForm.svelte';
	import Tab from './Tab.svelte';
	import Panel from './Panel.svelte';
	import FilteringForm from '../FilteringForm/FilteringForm.svelte';
	import Foldable from '../Foldable/Foldable.svelte';
	import type {
		FilterCategory,
		Parent,
		FilterStateValue
	} from '../../types/types';

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
	let panelOpen = $state(true);

	let tabSelected = $state('new-name-tab');
	
	const onSelect = (input: HTMLInputElement) => {
		tabSelected = input.id;
		const label = input.parentElement;
		if (label) {
			lineAttributes.left = label.offsetLeft;
			lineAttributes.width = label.clientWidth;
		}
		panelOpen = true;
	};
	const onPanelToggle = () => {
		panelOpen = !panelOpen;
	};
</script>

<section class="tabs z-2 mb-4 px-4">
	<fieldset class="relative flex items-center gap-8 px-3 pt-2 pb-1">
		<Tab
			label="Neuer Name"
			onChange={onSelect}
			id="new-name-tab"
			testId="new-name-tab-label"
			currentValue={tabSelected}
			selectInitial={true}
		/>

		<Tab
			label="Sortieren"
			onChange={onSelect}
			id="sort-tab"
			testId="sort-tab-label"
			currentValue={tabSelected}
		/>

		<Tab
			label="Filtern"
			onChange={onSelect}
			id="filter-tab"
			testId="filter-tab-label"
			currentValue={tabSelected}
		/>
		<div
			class="absolute bottom-0 h-[3px] rounded-xl bg-[#b5b4a2] transition-all"
			style={`left: ${lineAttributes.left}px; width: ${lineAttributes.width}px `}
		></div>
		<button
			onclick={onPanelToggle}
			class="absolute right-3 flex h-6 w-6 items-center justify-end"
			aria-label="Panel aufklappen"
		>
			<i
				class={clsx(
					'fa fa-chevron-up transform text-black transition-all',
					panelOpen ? 'rotate-180' : 'rotate-0'
				)}
			></i>
		</button>
	</fieldset>
	<Foldable open={panelOpen}>
		<div class="relative h-[252px] max-h-[252px] rounded-xl bg-white">
			<Panel visible={tabSelected === 'sort-tab'}>
				<SortingForm
					onChange={onSortingChange}
					{selectedSorting}
					onClear={onSortingClear}
				/>
			</Panel>
			<Panel visible={tabSelected === 'filter-tab'}>
				<FilteringForm
					onChange={onFilterChange}
					{selectedFilters}
					onClear={onFilterClear}
				/>
			</Panel>
			<Panel visible={tabSelected === 'new-name-tab'}>
				<NewNameForm />
			</Panel>
		</div>
	</Foldable>
</section>
