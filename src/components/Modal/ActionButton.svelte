<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	type Props = {
		onclick: (e: MouseEvent) => void;
		classes: string;
		children: Snippet;
	};

	const { children, onclick, classes }: Props = $props();
</script>

<button
	{onclick}
	class={clsx(
		'text-sm open-sans-bold flex items-center gap-3 rounded-xl border-1 px-3 py-1 min-w-[80px] justify-center',
		classes
	)}>{@render children()}</button
>
