<script lang="ts">
	import { useQuery } from 'convex-svelte';

	import NamesList from '../components/NamesList.svelte';
	import ParentForm from '../components/ParentForm.svelte';
	import { parentState } from '$lib/parentState.svelte';
	import { sortingState } from '$lib/sortingState.svelte';
	import { filteringState } from '$lib/filteringState.svelte';
	import Tabs from '../components/Tabs/Tabs.svelte';
	import { api } from '../convex/_generated/api.js';
	import {
		filterNames,
		sortAlphabeticallyAscending,
		sortAlphabeticallyDescending,
		sortRatingAscending,
		sortRatingDescending
	} from '$lib/helpers.js';
	import type { FilterCategory, Parent } from '../types/types';

	const query = useQuery(api.names.get, {});

	const onParentChange = (chosenParent: string) => {
		localStorage.setItem('parent', chosenParent);
		parentState.parent = chosenParent;
	};

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

	const sortedAndFiltered = $derived.by(() => {
		if (!query.data?.names?.length) return [];
		let names = filterNames(query.data.names, filteringState.value);
		if (sortingState.value === 'alphabetical-desc') {
			names.sort(sortAlphabeticallyDescending);
		}
		if (sortingState.value === 'alphabetical-asc') {
			names.sort(sortAlphabeticallyAscending);
		}
		if (sortingState.value === 'rating-asc') {
			names.sort(sortRatingAscending);
		}
		if (sortingState.value === 'rating-desc') {
			names.sort(sortRatingDescending);
		}
		return [...names];
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

<svelte:head>
	<title>Familia Baby Names</title>
	<meta name="description" content="Familia Baby Names" />
</svelte:head>
{#if !parentState.checked}
	Loading User...
{:else if !parentState.parent}
	<ParentForm onChange={onParentChange} />
{:else}
	<NamesList names={sortedAndFiltered} loading={query.isLoading} error={query.error} />
	<Tabs
		{onSortingChange}
		selectedSorting={sortingState.value}
		{onFilterChange}
		selectedFilters={filteringState.value}
		{onFilterClear}
		{onSortingClear}
	/>
{/if}
