<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import ListItem from '../ListItem/ListItem.svelte';
	import type { Name } from '../../types/types.js';

	type Props = {
		names: Array<Name>;
		loading: boolean;
		error?: Error;
	};

	const { names, loading, error }: Props = $props();
</script>

<section class=" flex w-full flex-grow-[1] flex-col-reverse overflow-scroll">
	{#if loading}
		<div class="flex justify-center pb-8 px-4">
			<p class="poppins-bold text-xl">Liste lädt...</p>
		</div>
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
		<ul class="flex h-full w-full flex-col-reverse justify-end py-2 ">
			{#each names as name (name.name)}
				<li animate:flip={{duration: 250}} in:fade out:fade>
					<ListItem {...name} />
				</li>
			{/each}
		</ul>
	{/if}
</section>
