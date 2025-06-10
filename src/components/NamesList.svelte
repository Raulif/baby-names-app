<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../convex/_generated/api.js';

	import ListItem from './ListItem/ListItem.svelte';

	const query = useQuery(api.names.get, {});
</script>

<section class="flex w-full flex-grow-[1] px-4">
	{#if query.isLoading}
		Loading List...
	{:else if query.error}
		failed to load names
	{:else}
		<ul class="flex-col flex w-full justify-end">
			{#each query.data.names as name}
				<ListItem {...name} />
			{/each}
		</ul>
	{/if}
</section>
