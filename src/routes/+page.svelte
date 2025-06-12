<script lang="ts">
	import { useQuery } from 'convex-svelte';

	import NamesList from '../components/NamesList.svelte';
	import ParentForm from '../components/ParentForm.svelte';
	import { parentState } from '../lib/parent.svelte';
	import { sortingState } from '$lib/sorting.svelte';
	import Tabs from '../components/Tabs/Tabs.svelte';
	import { api } from '../convex/_generated/api.js';
	import {
		sortAlphabeticallyAscending,
		sortAlphabeticallyDescending,
		sortRatingAscending,
		sortRatingDescending
	} from '$lib/helpers.js';

	const query = useQuery(api.names.get, {});

	const onParentChange = (chosenParent: string) => {
		localStorage.setItem('parent', chosenParent);
		parentState.parent = chosenParent;
	};

	const onSortingChange = (value: string) => {
		sortingState.value = value;
		localStorage.setItem('sorting', value);
	};

	const sortedNames = $derived.by(() => {
		if (!query.data?.names?.length) return [];
		let names = query.data.names;

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
	<NamesList names={sortedNames} loading={query.isLoading} error={query.error} />
	<Tabs {onSortingChange} selectedSorting={sortingState.value} />
{/if}
