<script lang="ts">
	import type { Rate } from '../../types/types';

	type Props = {
		rate: Array<Rate>;
	};
	const { rate }: Props = $props();

	const average = $derived.by(() => {
		if (!rate.length) return 0;
		return Math.round(rate.reduce((acc, r) => (acc += r.rate), 0)) / rate.length;
	});
	const voters = $derived(rate.map((r) => r.parent));
</script>

<div class="flex items-center gap-1">
	<span>
		{#if voters?.length === 2}
			<i class="fa fa-venus-mars text-[blueviolet]"></i>
		{:else if !voters?.length}
			{null}
		{:else if voters[0] === 'mama'}
			<i class="fa fa-venus text-[hotpink]"></i>
		{:else}
			<i class="fa fa-mars text-[#083885]"></i>
		{/if}
	</span>

	<span class="poppins-bold text-xl">
		{#if !rate.length}
			{null}
		{:else}
			{average}%
		{/if}
	</span>
</div>
