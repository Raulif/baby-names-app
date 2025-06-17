<script lang="ts">
	import clsx from 'clsx';
	import type { Name } from '../../types/types';
	import RateInput from '../RateInput/RateInput.svelte';
	import { parentState } from '../../lib/parentState.svelte';
	import RateDisplay from '../RateDisplay/RateDisplay.svelte';
	import ActionsMenu from '../ActionsMenu/ActionsMenu.svelte';

	type Props = { themeClass: string; open: boolean | null; onItemClick: () => void } & Name;

	const { name, rate, gender, veto = [], themeClass, onItemClick, open }: Props = $props();
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

	const onDelete = async (e: Event) => {
		e.stopPropagation();
		deleting.value = true;

		await fetch('?/delete', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
	};

	const vetoName = async (e: MouseEvent) => {
		e.stopPropagation();
		loading.value = true;

		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: true } })
		});
		loading.value = false;
	};
	const removeVeto = async (e: MouseEvent) => {
		e.stopPropagation();
		loading.value = true;

		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: false } })
		});
		loading.value = false;
	};

	const onWrapperClick = (e: MouseEvent) => {
		const element = e.currentTarget as HTMLDivElement;
		if (element.classList.contains('listitem-wrapper')) {
			onItemClick && onItemClick();
		}
	};
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === 'Space') {
			onItemClick && onItemClick();
		}
	};

	const vetos = $derived(veto?.filter((v) => v.veto));
	const vetoFromUser = $derived(vetos?.some((v) => v.parent === parentState.parent && !!v.veto));
</script>

<div
	tabindex="0"
	role="button"
	class={clsx('listitem-wrapper', deleting.value && 'opacity-50', themeClass)}
	onclick={onWrapperClick}
	onkeydown={onKeyDown}
>
	<div class="listitem flex w-full flex-col gap-2 rounded-2xl px-5 pt-4 pb-2">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="open-sans-bold flex items-center text-xl">{name}</span>
			</div>
			<div class="gender-bg flex h-8 w-8 items-center justify-center rounded-full">
				{#if gender === 'f'}
					<i class="fa fa-venus gender-icon text-lg"> </i>
				{:else}
					<i class="fa fa-mars gender-icon text-lg"></i>
				{/if}
			</div>
		</div>

		<div class="flex min-h-[28px] items-center">
			<form method="POST" class="flex-[2]" onsubmit={onSubmit} id={`rate-form-${name}`}>
				<RateInput
					value={userRate}
					debug={name === 'name A'}
					{onChangeHandler}
					changed={rateChanged.value}
					loading={loading.value}
				/>
			</form>
			<div class="flex flex-[1] justify-end">
				{#if loading.value}
					<div class="flex h-6 min-w-6 items-center justify-center">
						<i class="fa fa-spinner text-md animate-spin"></i>
					</div>
				{:else if rateChanged.value}
					<button
						class="action-button open-sans-regular rounded-xl px-2 py-1 text-sm text-[#918f8a]"
						type="submit"
						form={`rate-form-${name}`}>Speichern</button
					>
				{:else}
					<RateDisplay {rate} veto={vetos} />
				{/if}
			</div>
		</div>
		<ActionsMenu {vetoFromUser} {vetoName} deleteName={onDelete} {open} {removeVeto} />
	</div>
</div>

<style>
	.listitem {
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}

	.expandable {
		transition: 0.3s all;
	}
</style>
