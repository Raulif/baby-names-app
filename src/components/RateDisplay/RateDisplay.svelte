<script lang="ts">
	import type { Name, Rate } from '../../types/types';

	type Props = {
		rate: Array<Rate>;
		name: string;
	};
	const { rate, name }: Props = $props();

	const average = $derived.by(() => {
		if (!rate.length) return 0;
		return (
			Math.round(rate.reduce((acc, r) => (acc += r.rate), 0)) / rate.length
		);
	});
</script>

<span class="open-sans-regular text-md text-[#918f8a]">
	{#if !rate.length}
		{null}
	{:else}
		<span data-testid="rating-display-{name}">{average}</span>
		% Zust.
	{/if}
</span>
