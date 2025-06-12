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

<style>
	.filter-container {
		box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.3);
	}
</style>
