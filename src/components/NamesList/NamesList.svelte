<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import ListItem from '../ListItem/ListItem.svelte';
	import type { ClassNumber, Name } from '../../types/types.js';

	type Props = {
		names: Array<Name>;
		loading: boolean;
		error?: Error;
	};

	const { names, loading, error }: Props = $props();
</script>

<section class=" flex w-full flex-grow-[1] flex-col-reverse overflow-scroll px-4 ">
	{#if loading}
		<div class="flex justify-center px-4 pb-8">
			<p class="open-sans-bold text-xl">Namensliste lädt...</p>
		</div>
	{:else if error}
		Die Namensliste konnten nicht geladen werden
	{:else}
		<ul class="flex h-full w-full flex-col-reverse justify-end py-2 gap-2">
			{#each names as name, index (name.name)}
				<li animate:flip={{ duration: 250 }} in:fade out:fade>
					<ListItem {...name} number={(index % 5).toString() as ClassNumber} />
				</li>
			{:else}
				<div class="fixed top-[25%] left-0 flex w-full">
					<p
						class=" w-full gap-2 bg-white px-4 py-4 pb-4 text-center open-sans-bold flex items-center justify-center text-xl"
					>
						Die Namensliste ist noch leer
					</p>
				</div>
			{/each}
		</ul>
	{/if}
</section>
