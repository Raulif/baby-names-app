<script lang="ts">
	import type { FilterCategory, Parent, FilteringStateValue } from '../../types/types';
	import { parentState } from '$lib/parentState.svelte';
	import FilteringCheckbox from './FilteringRadio.svelte';
	import ClearFilterButton from '../ClearFilterButton/ClearFilterButton.svelte';
	type Props = {
		onChange: (value: Parent | string, category: FilterCategory) => void;
		selectedFilters: FilteringStateValue;
		onClear: () => void;
	};

	const { onChange, selectedFilters, onClear }: Props = $props();
</script>

<section class="relative h-full px-4 pt-3">
	<fieldset>
		<div class="absolute top-2 right-4">
			{#if selectedFilters.filterUser || selectedFilters.filterGender}
				<ClearFilterButton {onClear} />
			{/if}
		</div>
		<div class="grid-auto-rows grid h-full gap-2 divide-y-1 divide-violet-600">
			<div class="flex flex-col gap-2 pb-2">
				<span class="poppins-regular">Nach Nutzer</span>
				<div class="flex gap-4">
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
			</div>
			<div class="flex flex-col gap-2 pb-4">
				<span class="poppins-regular">Nach Geschlecht</span>
				<div class="flex gap-4">
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
			<div class="flex flex-col gap-2 pb-4">
				<span class="poppins-regular">Nach Bewertung</span>
				<div class="flex gap-4">
					<FilteringCheckbox
						name="filterRating"
						value={"true"}
						label="Bewertet"
						{onChange}
						{selectedFilters}
					/>
					<FilteringCheckbox
						name="filterRating"
						value={"false"}
						label="Nicht bewertet"
						{onChange}
						{selectedFilters}
					/>
				</div>
			</div>
		</div>
	</fieldset>
</section>
