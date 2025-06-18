<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import ListItem from '../ListItem/ListItem.svelte';
	import type { ClassNumber, Name } from '../../types/types.js';
	import { getThemeClass } from '$lib/helpers';

	type Props = {
		names: Array<Name>;
		loading: boolean;
		error?: Error;
	};

	const { names, loading, error }: Props = $props();
	let selectedIndex: number | null = $state(null);
</script>

<section class=" flex w-full flex-grow-[1] flex-col-reverse overflow-scroll px-5">
	{#if loading}
		<div class="fixed top-[25%] left-0 flex w-full px-4">
			<p
				class="listitem open-sans-bold flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-4 py-4 pb-4 text-center text-xl"
			>
				Namensliste lädt...
			</p>
		</div>
	{:else if error}
		<div class="fixed top-[25%] left-0 flex w-full px-4">
			<p
				class="listitem open-sans-bold flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-4 py-4 pb-4 text-center text-xl"
			>
				Die Namensliste konnten nicht geladen werden
			</p>
		</div>
	{:else}
		<ul class="flex h-full w-full flex-col-reverse justify-end gap-2 pt-2 pb-3">
			{#each names as name, index (name.name)}
				<li animate:flip={{ duration: 250 }} in:fade out:fade>
					<ListItem
						open={selectedIndex !== null && selectedIndex === index}
						{...name}
						themeClass={getThemeClass((index % 5) as ClassNumber)}
						bind:selectedIndex
					{index}
					/>
				</li>
			{:else}
				<div class="fixed top-[25%] left-0 flex w-full px-4">
					<p
						class="listitem w-full gap-2 bg-white px-4 py-4 pb-4 text-center open-sans-bold flex items-center justify-center text-xl rounded-xl overflow-hidden"
					>
						Die Namensliste ist leer
					</p>
				</div>
			{/each}
		</ul>
	{/if}
</section>
