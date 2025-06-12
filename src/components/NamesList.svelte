<script lang="ts">
	import ListItem from './ListItem/ListItem.svelte';
	import type { Name } from '../types/types.js';

	type Props = {
		names: Array<Name>;
		loading: boolean;
		error?: Error;
	};

	const { names, loading, error }: Props = $props();

</script>

<section class=" flex w-full flex-grow-[1] flex-col-reverse overflow-scroll px-4">
	{#if loading}
		Loading List...
	{:else if error}
		failed to load names
	{:else if !names.length}
		<div class="fixed top-[25%] left-0 flex w-full items-center justify-center px-4">
			<p
				class="raleway-bold rounded-xl border-3 border-white bg-violet-200 px-10 py-8 text-center text-2xl shadow-2xl"
			>
				Die Liste ist noch leer
			</p>
		</div>
	{:else}
		<ul class="mt-4 flex h-full w-full flex-col-reverse justify-end">
			{#each names as name}
				<ListItem {...name} />
			{/each}
		</ul>
	{/if}
</section>

<!-- <div class="flex justify-between filter-container">
	<select class="max-w-[33vw] flex-[1]" onchange={onSortingChange}>
		<option value="">Sortieren</option>
		<option value="alphabetical-asc">Alphabetisch A-Z</option>
		<option value="rating">Bewertung</option>
	</select>
	<select class="max-w-[33vw] flex-[1]">
		<option value="">Filter</option>
		<option value="all">Alle</option>
		<option value="user">Nur meine</option>
	</select>
	<select class="max-w-[33vw] flex-[1]">
		<option value="">Gender</option>
		<option value="all">Alle</option>
		<option value="male">Nur Junge</option>
		<option value="female">Nur Mädchen</option>
	</select>
</div> -->

<style>
	.filter-container {
		box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.3);
	}
</style>
