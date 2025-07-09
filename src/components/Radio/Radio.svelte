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
		'open-sans-regular relative flex flex-[1] items-center gap-2 ',
		checked && 'open-sans-bold text-black',
		!checked && 'text-[#6d6d6d]'
	)}
>
	<input
		type="radio"
		{name}
		{value}
		onchange={(e) => onChange((e.target as HTMLInputElement)?.value)}
		class="peer pointer-events-none absolute opacity-0"
		{checked}
	/>
	<div
		class="flex h-5 w-5 items-center justify-center rounded-full border-1 border-[#b5b4a2]"
	>
		<div
			class={clsx(
				'h-4 w-4 scale-0 rounded-full bg-[#b5b4a2] transition-transform',
				checked && 'scale-100'
			)}
		></div>
	</div>
	{label}
</label>
