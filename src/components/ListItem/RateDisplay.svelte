<script lang="ts">
	import clsx from 'clsx';
	import type { Name, Rate } from '../../types/types';

	type Props = {
		rate: Array<Rate>;
		veto: Name['veto'];
	};
	const { rate, veto }: Props = $props();

	const average = $derived.by(() => {
		if (!rate.length) return 0;
		return Math.round(rate.reduce((acc, r) => (acc += r.rate), 0)) / rate.length;
	});
	const raters = $derived(rate.map((r) => r.parent));
	const vetos = $derived(veto.map((v) => !!v.veto));
</script>

<div class="flex items-center gap-1">
	<span class={clsx(vetos.length && 'opacity-30')}>
		{#if raters?.length === 2}
			<i class="fa fa-venus-mars text-[blueviolet]"></i>
		{:else if !raters?.length}
			{null}
		{:else if raters[0] === 'mama'}
			<i class="fa fa-venus text-[hotpink]"></i>
		{:else}
			<i class="fa fa-mars text-[#083885]"></i>
		{/if}
	</span>

	<span class={clsx('poppins-bold text-xl', vetos.length && 'opacity-30')}>
		{#if !rate.length}
			{null}
		{:else}
			{average}%
		{/if}
	</span>
</div>
