<script lang="ts">
	import type {
		FilterCategory,
		FilterStateValue
	} from '../../types/types';
	import { userState } from '$lib/userState.svelte';
	import FilterRow from './FilterRow.svelte';

	type Props = {
		onChange: (value: string, category: FilterCategory) => void;
		selectedFilters: FilterStateValue;
		onClear: (category: FilterCategory) => void;
	};

	const { onChange, selectedFilters, onClear }: Props = $props();
	const otherParent = $derived(userState.partnerName);
</script>

<section class="relative h-full">
	<fieldset class="flex h-full flex-col gap-2">
		<FilterRow
			{onChange}
			{selectedFilters}
			{onClear}
			title="Nach Nutzer"
			category="filterUser"
			valueLabels={[
				{ value: userState.userName, label: 'Meine' },
				{ value: otherParent, label: 'Andere' }
			]}
		/>
		<FilterRow
			{onChange}
			{selectedFilters}
			{onClear}
			title="Nach Geschlecht"
			category="filterGender"
			valueLabels={[
				{ value: 'f', label: 'Mädchen' },
				{ value: 'm', label: 'Junge' }
			]}
		/>
		<FilterRow
			{onChange}
			{selectedFilters}
			{onClear}
			title="Nach Bewertung"
			category="filterRating"
			valueLabels={[
				{ value: 'true', label: 'Bewertet' },
				{ value: 'false', label: 'Nicht bewertet' }
			]}
		/>
	</fieldset>
</section>
