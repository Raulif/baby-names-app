<script lang="ts">
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
	{#if vetos.length}
		<span class="veto-indicator open-sans-regular text-md text-[#918f8a]"> Veto </span>
	{:else}
		<span class="open-sans-regular text-md text-[#918f8a]">
			{#if !rate.length}
				{null}
			{:else}
				{average}% Zust.
			{/if}
		</span>
	{/if}
</div>
