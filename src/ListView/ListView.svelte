<script lang="ts">
	import { useQuery } from 'convex-svelte';

	import NamesList from '../components/NamesList.svelte';
	import Tabs from '../components/Tabs/Tabs.svelte';
	import { api } from '../convex/_generated/api';
	import { filterNames, sortNames } from '$lib/helpers';
	import { filteringState } from '$lib/filteringState.svelte';
	import { sortingState } from '$lib/sortingState.svelte';
	import type { FilterCategory, Parent } from '../types/types';

	const query = useQuery(api.names.get, {});

	const onSortingChange = (value: string) => {
		sortingState.value = value;
		localStorage.setItem('sorting', value);
	};

	const onFilterChange = (value: Parent | string, category: FilterCategory) => {
		let filters = { ...filteringState.value };
		filters[category] = value;
		filteringState.value = filters;
		localStorage.setItem('filtering', JSON.stringify(filters));
	};

	const onFilterClear = () => {
		const emptyFilters = {
			filterUser: '',
			filterGender: ''
		};
		filteringState.value = emptyFilters;
		localStorage.setItem('filtering', JSON.stringify(emptyFilters));
	};

	const onSortingClear = () => {
		sortingState.value = '';
		localStorage.setItem('sorting', '');
	};

	const namesList = $derived.by(() => {
		if (!query.data?.names?.length) return [];
		const filtered = filterNames(query.data.names, filteringState.value);
		const sorted = sortNames(filtered, sortingState.value);
		return sorted;
	});

	$effect(() => {
		if (!!localStorage.getItem('sorting') && !sortingState.value) {
			sortingState.value = localStorage.getItem('sorting') as string;
		}
	});

	$effect(() => {
		if (!!localStorage.getItem('filtering') && !filteringState.checked) {
			const filters = JSON.parse(localStorage.getItem('filtering') as string);
			filteringState.value = filters;
			filteringState.checked = true;
		}
	});
</script>

<div class="list-view">
	<NamesList names={namesList} loading={query.isLoading} error={query.error} />
	<Tabs
		{onSortingChange}
		selectedSorting={sortingState.value}
		{onFilterChange}
		selectedFilters={filteringState.value}
		{onFilterClear}
		{onSortingClear}
	/>
</div>

<style>
  .list-view {
    flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		max-width: 500px;
		margin: 0 auto;
		max-height: 100dvh;
		max-height: 100vh;
		overflow: hidden;
  }
</style>