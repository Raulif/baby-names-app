<script lang="ts">
	import clsx from 'clsx';

	type Props = {
		name: string;
		onChange: (value: string) => void;
		label: string;
		value: string;
		selectedSorting?: string;
	};
	const { label, name, value, onChange, selectedSorting }: Props = $props();
</script>

<label class={clsx("raleway-regular flex flex-[1] items-center gap-2",
	selectedSorting === value && 'raleway-bold'
)}>
	<input
		type="radio"
		{name}
		{value}
		onchange={(e) => onChange((e.target as HTMLInputElement)?.value)}
		class="peer checked:bg-violet-700"
		checked={selectedSorting === value}
	/>
{label}
</label>
