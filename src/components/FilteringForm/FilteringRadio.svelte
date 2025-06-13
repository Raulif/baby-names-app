<script lang="ts">
	import clsx from 'clsx';
	import type { FilterCategory, Parent, FilteringStateValue } from '../../types/types';

	type Props = {
		name: FilterCategory;
		onChange: (value: Parent | string, category: FilterCategory) => void;
		label: string;
		value: string | Parent | boolean;
		selectedFilters: FilteringStateValue;
	};
	const { label, name, value, onChange, selectedFilters }: Props = $props();
</script>

<label
	class={clsx(
		'raleway-regular flex flex-[1] items-center gap-2',
		selectedFilters[name] === value && 'raleway-bold'
	)}
>
	<input
		type="radio"
		{name}
		{value}
		onchange={(e) => onChange((e.target as HTMLInputElement)?.value, name)}
		class="peer checked:bg-violet-700"
		checked={selectedFilters[name] === value}
	/>
	{label}
</label>
