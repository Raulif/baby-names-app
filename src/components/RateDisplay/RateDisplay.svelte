<script lang="ts">
	import type { Name, Rate } from '../../types/types';

	type Props = {
		rate: Array<Rate>;
		veto: Name['veto'];
		name: string;
	};
	const { rate, veto, name }: Props = $props();

	const average = $derived.by(() => {
		if (!rate.length) return 0;
		return (
			Math.round(rate.reduce((acc, r) => (acc += r.rate), 0)) / rate.length
		);
	});
	const vetos = $derived(veto.map((v) => !!v.veto));
</script>

<div class="flex items-center gap-1">
	{#if vetos.length}
		<span
			data-testid="veto-indicator-{name}"
			class="veto-indicator open-sans-regular text-md text-[#918f8a]"
		>
			Veto
		</span>
	{:else}
		<span class="open-sans-regular text-md text-[#918f8a]">
			{#if !rate.length}
				{null}
			{:else}
				<span data-testid="rating-display-{name}">{average}</span>
				% Zust.
			{/if}
		</span>
	{/if}
</div>
