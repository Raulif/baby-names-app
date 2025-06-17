<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	type Props = {
		open: boolean | null;
		children: Snippet;
	};
	const { open, children }: Props = $props();
</script>

<div class={clsx('tansition-all grid duration-250', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
	<div class="overflow-hidden">
		{@render children()}
	</div>
</div>
