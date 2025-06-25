<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	type Props = {
		onclick: (e: MouseEvent) => void;
		classes: string;
		children: Snippet;
		testId?: string;
	};

	const { children, onclick, classes, testId }: Props = $props();
</script>

<button
	data-testId={testId}
	{onclick}
	class={clsx(
		'open-sans-bold flex min-w-[80px] items-center justify-center gap-3 rounded-xl border-1 px-3 py-1 text-sm',
		classes
	)}
>
	{@render children()}
</button>
