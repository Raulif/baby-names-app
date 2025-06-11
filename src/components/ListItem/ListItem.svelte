<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Name } from '../../types/types';

	import RateInput from './RateInput.svelte';
	import { parentState } from '../../lib/parent.svelte';
	import RateDisplay from './RateDisplay.svelte';
	const { name, rate, parent }: Name = $props();
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
		deleting.value = false;
	};
</script>

<li class="mb-4 flex w-full flex-col gap-2 border-b-1 border-b-[lightgrey] pb-4">
	<div class="flex items-center justify-between pr-2">
		<span class="quicksand-700 block text-xl">{name}</span>
		{#if parent === parentState.parent}
			<button
				onclick={onDelete}
				aria-label="Name entfernen"
				class="flex h-6 w-6 items-center justify-center"
			>
				<i class="fa fa-trash text-sm text-red-600"></i>
			</button>
		{:else}
			<span></span>
		{/if}
	</div>

	<div class="flex items-center">
		<form method="POST" class="flex-[2]" onsubmit={onSubmit}>
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
</li>
