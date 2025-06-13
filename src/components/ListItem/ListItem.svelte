<script lang="ts">
	import clsx from 'clsx';
	import type { Name } from '../../types/types';
	import RateInput from './RateInput.svelte';
	import { parentState } from '../../lib/parentState.svelte';
	import RateDisplay from './RateDisplay.svelte';
	const { name, rate, parent, gender, veto = [] }: Name = $props();
	const rateChanged = $state({ value: false });
	const loading = $state({ value: false });
	const deleting = $state({ value: false });

	const userRate = $derived(
		rate.find((r) => !!parentState.checked && r.parent === parentState.parent)?.rate
	);

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		loading.value = true;
		rateChanged.value = false;

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		formData.append('parent', parentState.parent);
		formData.append('name', name);
		await fetch('?/rate', {
			method: 'POST',
			body: formData
		});
		loading.value = false;
	};

	const onChangeHandler = () => {
		rateChanged.value = true;
	};

	const onDelete = async () => {
		deleting.value = true;
		await fetch('?/delete', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
	};

	const onVeto = async () => {
		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: true } })
		});
	};
	const vetoed = $derived(veto?.some((v) => v.parent === parentState.parent && !!v.veto));
</script>

<div
	class={clsx(
		'flex w-full flex-col gap-2 overflow-hidden rounded-2xl border-b-1 border-b-[lightgrey] bg-white px-4 py-4 pb-4',
		deleting.value && 'opacity-50'
	)}
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			{#if gender === 'f'}
				<i class="fa fa-venus text-sm text-pink-300"> </i>
			{:else}
				<i class="fa fa-mars text-sm text-blue-300"></i>
			{/if}
			<span class="poppins-bold flex items-center text-xl">{name}</span>
		</div>
		<div class="flex items-center gap-2">
			{#if !vetoed}
				<button
					onclick={onVeto}
					aria-label="Veto Name"
					class="flex h-6 w-6 items-center justify-center"
				>
					<i class="fa fa-ban text-sm text-red-600"></i>
				</button>
			{/if}
			{#if parent === parentState.parent}
				<button
					onclick={onDelete}
					aria-label="Name entfernen"
					class="flex h-6 w-6 items-center justify-center"
				>
					<i class="fa fa-trash text-sm text-red-600"></i>
				</button>
			{/if}
		</div>
	</div>

	<div class="flex min-h-[28px] items-center">
		<form method="POST" class="flex-[2.5]" onsubmit={onSubmit}>
			<RateInput
				value={userRate}
				debug={name === 'name A'}
				{onChangeHandler}
				changed={rateChanged.value}
				loading={loading.value}
			/>
		</form>
		<div class="flex flex-[1] justify-end"><RateDisplay {rate} /></div>
	</div>
</div>
