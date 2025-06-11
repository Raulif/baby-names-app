<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../convex/_generated/api.js';

	import ListItem from './ListItem/ListItem.svelte';

	const query = useQuery(api.names.get, {});
</script>

<section class=" flex w-full flex-grow-[1] flex-col-reverse overflow-scroll px-4">
	{#if query.isLoading}
		Loading List...
	{:else if query.error}
		failed to load names
	{:else if !query.data.names.length}
		<div class="fixed top-[25%] left-0 flex w-full items-center justify-center px-4">
			<p
				class="quicksand-700 rounded-xl border-3 border-white bg-violet-200 px-10 py-8 text-center text-2xl shadow-2xl"
			>
				Die Liste ist noch leer
			</p>
		</div>
	{:else}
		<ul class="mt-4 flex h-full w-full flex-col-reverse justify-end">
			{#each query.data.names as name}
				<ListItem {...name} />
			{/each}
		</ul>
	{/if}
</section>
