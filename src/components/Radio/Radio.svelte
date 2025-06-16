<script lang="ts">
	import clsx from 'clsx';
	import type { Parent } from '../../types/types';

	type Props = {
		name: string;
		onChange: (value: string) => void;
		label: string;
		value: string | Parent | boolean;
		checked: boolean;
	};
	const { label, name, value, onChange, checked }: Props = $props();
</script>

<label
	class={clsx(
		'raleway-regular relative flex flex-[1] items-center gap-2',
		checked && 'raleway-bold'
	)}
>
	<input
		type="radio"
		{name}
		{value}
		onchange={(e) => onChange((e.target as HTMLInputElement)?.value)}
		class="peer pointer-events-none absolute opacity-0 checked:bg-violet-700"
		{checked}
	/>
	<div class="flex h-5 w-5 items-center justify-center rounded-full border-1 border-violet-700">
		<div
			class={clsx(
				'h-4 w-4 scale-0 rounded-full bg-violet-700 transition-transform',
				checked && 'scale-100'
			)}
		></div>
	</div>
	{label}
</label>
