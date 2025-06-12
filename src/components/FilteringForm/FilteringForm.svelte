<script lang="ts">
	import type { FilterCategory, Parent, SelectedFilters } from '../../types/types';
	import { parentState } from '$lib/parentState.svelte';
	import FilteringCheckbox from './FilteringRadio.svelte';
	type Props = {
		onChange: (value: Parent | string, category: FilterCategory) => void;
		selectedFilters: SelectedFilters;
		onClear: () => void;
	};

	const { onChange, selectedFilters, onClear }: Props = $props();
</script>

<section class="max-h-[144px] px-4 pt-3">
	<fieldset>
		<div class="flex items-center justify-between">
			<legend class="poppins-bold text-md">Liste filtern</legend>
			{#if selectedFilters.filterUser || selectedFilters.filterGender}
				<button
					onclick={onClear}
					class="poppins-regular flex items-center gap-2 rounded-2xl bg-violet-800 px-2 text-white"
					><i class="fa fa-xmark"></i>Entfernen</button
				>
			{/if}
		</div>
		<div
			class="grid max-h-[96px] grid-cols-2 flex-col flex-wrap items-start justify-between gap-x-6 divide-x-2 divide-violet-600 pt-4"
		>
			<div class="flex flex-col gap-4">
				<FilteringCheckbox
					name="filterUser"
					value={parentState.parent}
					label="Meine"
					{onChange}
					{selectedFilters}
				/>
				<FilteringCheckbox
					name="filterUser"
					value={parentState.parent === 'mama' ? 'papa' : 'mama'}
					label="Andere"
					{onChange}
					{selectedFilters}
				/>
			</div>
			<div class="flex flex-col gap-4">
				<FilteringCheckbox
					name="filterGender"
					value="f"
					label="Mädchen"
					{onChange}
					{selectedFilters}
				/>
				<FilteringCheckbox
					name="filterGender"
					value="m"
					label="Junge"
					{onChange}
					{selectedFilters}
				/>
			</div>
		</div>
	</fieldset>
</section>
