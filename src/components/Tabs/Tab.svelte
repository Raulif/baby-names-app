<script lang="ts">
	import clsx from 'clsx';
	import type { MouseEventHandler } from 'svelte/elements';

	type Props = {
		selectInitial?: boolean;
		label: string;
		onChange: (element: HTMLInputElement) => void;
		currentValue: string;
		id: string;
		testId:string
	};
	const { testId, currentValue, onChange, id, label, selectInitial }: Props = $props();
	const selected = $derived(currentValue === id);

	$effect(() => {
		if (selectInitial) {
			const input = document.querySelector(`#${id}`) as HTMLInputElement;
			if (input) {
				onChange(input);
			}
		}
	});

	const onClick = (event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement; }) => {
		if (currentValue === id) {
			const input = event.currentTarget
			onChange(input)
		}
		return
	}
</script>

<label
	class={clsx(
		'tab open-sans-regular  text-md py-1 text-center',
		selected && 'text-black',
		!selected && ' text-[#918f8a] '
	)}
	data-testid={testId}
>
	{label}
	<input
		type="radio"
		name="tabs"
		{id}
		onchange={(e) => onChange(e.target as HTMLInputElement)}
		onclick={onClick}
		class="visually-hidden"
		checked={selected}
	/>
</label>
