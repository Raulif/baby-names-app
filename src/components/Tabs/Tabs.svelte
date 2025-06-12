<script lang="ts">
	import clsx from 'clsx';
	import NewNameForm from '../NewNameForm/NewNameForm.svelte';
	import SortingForm from '../SortingForm/SortingForm.svelte';
	import Tab from './Tab.svelte';
	import Panel from './Panel.svelte';

	type Props = {
		onSortingChange: (value: string) => void;
		selectedSorting?: string;
	};

	const { onSortingChange, selectedSorting }: Props = $props();

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
			<SortingForm onChange={onSortingChange} {selectedSorting} />
		</Panel>
		<Panel visible={tabSelected.value === 'filter-tab'}>
			<div>Filtering</div>
		</Panel>
		<Panel visible={tabSelected.value === 'new-name-tab'}>
			<NewNameForm />
		</Panel>
	</div>
</section>
