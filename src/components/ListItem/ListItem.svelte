<script lang="ts">
	import clsx from 'clsx';
	import type { ClassNumber, Name } from '../../types/types';
	import RateInput from './RateInput.svelte';
	import { parentState } from '../../lib/parentState.svelte';
	import RateDisplay from './RateDisplay.svelte';

	type Props = { number: ClassNumber } & Name;

	const { name, rate, parent, gender, veto = [], number }: Props = $props();
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

	const vetoName = async () => {
		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: true } })
		});
	};
	const removeVeto = async () => {
		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: false } })
		});
	};
	const vetos = $derived(veto?.filter((v) => v.veto));
	const vetoFromUser = $derived(vetos?.some((v) => v.parent === parentState.parent && !!v.veto));
	const vetoers = $derived(
		vetos?.map((v) => (v.parent === parentState.parent ? 'dir' : v.parent)).join(' und ')
	);
	const themeClassesMap = {
		'1': 'theme-blue',
		'2': 'theme-pink',
		'3': 'theme-orange',
		'4': 'theme-green',
		'0': 'theme-yellow'
	};
	const themeClass = $derived(themeClassesMap[number]);
</script>

<div class={clsx(' ', deleting.value && 'opacity-50', themeClass)}>
	<div class="listitem w-full flex-col gap-2 rounded-2xl px-4 py-4 pb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<div class="gender-bg">
					{#if gender === 'f'}
						<i class="fa fa-venus gender-icon text-sm"> </i>
					{:else}
						<i class="fa fa-mars gender-icon text-sm"></i>
					{/if}
				</div>
				<span class="open-sans-bold flex items-center text-xl">{name}</span>
				{#if vetoFromUser}
					<button
						class="open-sans-regular flex h-6 items-center justify-center gap-2"
						aria-label="Veto entfernen"
						onclick={removeVeto}
					>
						<span class="text-sm">Veto entfernen</span>
						<i class="fa fa-square-check text-md text-green-600"></i>
					</button>
				{:else if vetos.length}
					<span class="open-sans-regular text-sm">Veto von {vetoers}</span>
				{/if}
			</div>
			<div class="flex items-center gap-2">
				{#if !vetoFromUser}
					<button
						onclick={vetoName}
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
			<div class="flex flex-[1] justify-end"><RateDisplay {rate} veto={vetos} /></div>
		</div>
	</div>
</div>

<style>
	.listitem {
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
	}
</style>
