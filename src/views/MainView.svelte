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
	import PermissionModal from '../components/PermissionModal/PermissionModal.svelte';
	import { permissionState } from '$lib/permissionState.svelte';

	const namesQuery = useQuery(api.names.get, {});
	let selectedIndex: number | null = $state(null);

	const onSortingChange = (value: string) => {
		selectedIndex = null;
		sortingState.value = value;
		localStorage.setItem('sorting', value);
	};

	const onFilterChange = (
		value: FilterUser | FilterGender | FilterRating,
		category: FilterCategory
	) => {
		selectedIndex = null;
		let filters = { ...filteringState.value };
		filters[category] = value;
		filteringState.value = filters;
		localStorage.setItem('filtering', JSON.stringify(filters));
	};

	const onFilterClear = (category: FilterCategory) => {
		selectedIndex = null;
		filteringState.value = { ...filteringState.value, [category]: '' };
		localStorage.setItem('filtering', JSON.stringify(filteringState.value));
	};

	const onSortingClear = () => {
		selectedIndex = null;
		sortingState.value = '';
		localStorage.setItem('sorting', '');
	};

	const namesList = $derived.by(() => {
		if (!namesQuery.data?.names?.length) return [];
		const filtered = filterNames(
			namesQuery.data.names,
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
	let showModal = $state(false);

	$effect(() => {
		if (permissionState.checked && permissionState.permission === 'default') {
			showModal = true;
		}
	});
</script>

<NamesList
	bind:selectedIndex
	names={namesList}
	loading={namesQuery.isLoading}
	error={namesQuery.error}
/>

<Tabs
	{onSortingChange}
	selectedSorting={sortingState.value}
	{onFilterChange}
	selectedFilters={filteringState.value}
	{onFilterClear}
	{onSortingClear}
/>
<PermissionModal bind:showModal />
