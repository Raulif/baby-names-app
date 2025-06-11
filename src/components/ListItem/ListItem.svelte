<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Name } from '../../types/types';

	import RateInput from './RateInput.svelte';
	import { parentState } from '../../lib/parent.svelte';
	import RateDisplay from './RateDisplay.svelte';
	import clsx from 'clsx';
	const { name, rate, parent, gender }: Name = $props();
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

<li
	class={clsx(
		'mb-4 flex w-full flex-col gap-2 border-b-1 border-b-[lightgrey] pb-4',
		deleting.value && 'opacity-70'
	)}
>
	<div class="flex items-center justify-between pr-2">
		<div class="flex items-center gap-2">
			{#if gender === 'f'}
			<i class="fa fa-venus text-sm text-pink-300"> </i>
			{:else}
			<i class="fa fa-mars text-sm text-blue-300" ></i>
			{/if}
			<span class="quicksand-700 text-xl flex items-center">{name}</span>
		</div>
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

	<div class="flex min-h-[28px] items-center">
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
