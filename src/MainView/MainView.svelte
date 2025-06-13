<script lang="ts">
	import { useQuery } from 'convex-svelte';

	import NamesList from '../components/NamesList/NamesList.svelte';
	import Tabs from '../components/Tabs/Tabs.svelte';
	import { api } from '../convex/_generated/api';
	import { filterNames, sortNames } from '$lib/helpers';
	import { filteringState } from '$lib/filteringState.svelte';
	import { sortingState } from '$lib/sortingState.svelte';
	import type {
		FilterCategory,
		FilterGender,
		FilterRating,
		FilterUser,
		Parent
	} from '../types/types';
	import { parentState } from '$lib/parentState.svelte';

	const query = useQuery(api.names.get, {});

	const onSortingChange = (value: string) => {
		sortingState.value = value;
		localStorage.setItem('sorting', value);
	};

	const onFilterChange = (
		value: FilterUser | FilterGender | FilterRating,
		category: FilterCategory
	) => {
		let filters = { ...filteringState.value };
		filters[category] = value;
		filteringState.value = filters;
		localStorage.setItem('filtering', JSON.stringify(filters));
	};

	const onFilterClear = () => {
		const emptyFilters = {
			filterUser: '',
			filterGender: '',
			filterRating: ''
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
		const filtered = filterNames(
			query.data.names,
			filteringState.value,
			parentState.parent as Parent
		);
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

<NamesList names={namesList} loading={query.isLoading} error={query.error} />
<Tabs
	{onSortingChange}
	selectedSorting={sortingState.value}
	{onFilterChange}
	selectedFilters={filteringState.value}
	{onFilterClear}
	{onSortingClear}
/>
