<script lang="ts">
	import clsx from 'clsx';
	import type { Name } from '../../types/types';
	import RateInput from '../RateInput/RateInput.svelte';
	import { parentState } from '../../lib/parentState.svelte';
	import RateDisplay from '../RateDisplay/RateDisplay.svelte';
	import ActionsMenu from '../ActionsMenu/ActionsMenu.svelte';
	import Modal from '../Modal/Modal.svelte';

	type Props = {
		themeClass: string;
		open: boolean | null;
		selectedIndex: number | null;
		index: number;
	} & Name;

	let {
		name,
		rate,
		gender,
		veto = [],
		parent,
		themeClass,
		open,
		selectedIndex = $bindable(),
		index
	}: Props = $props();

	let rateChanged = $state(false);
	let loading = $state(false);
	let deleting = $state(false);
	let showModal = $state(false);

	const onRateSubmit = async (e: MouseEvent) => {
		e.stopPropagation();
		loading = true;
		rateChanged = false;
		const button = e.target as HTMLButtonElement;
		const form = button.form as HTMLFormElement;
		const formData = new FormData(form);

		formData.append('parent', parentState.parent);
		formData.append('name', name);
		await fetch('?/rate', {
			method: 'POST',
			body: formData
		});
		loading = false;
	};

	const onChangeHandler = () => {
		rateChanged = true;
	};

	const onRequestDelete = (e: Event) => {
		e.stopPropagation();
		showModal = true;
	};

	const onDelete = async (e: Event) => {
		showModal = false;
		deleting = true;

		await fetch('?/delete', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
		selectedIndex = null;
	};

	const vetoName = async (e: MouseEvent) => {
		e.stopPropagation();
		loading = true;

		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: true } })
		});
		loading = false;
	};

	const removeVeto = async (e: MouseEvent) => {
		e.stopPropagation();
		loading = true;

		await fetch('?/veto', {
			method: 'POST',
			body: JSON.stringify({ name, veto: { parent: parentState.parent, veto: false } })
		});
		loading = false;
	};

	const onWrapperClick = (e: MouseEvent) => {
		const element = e.currentTarget as HTMLDivElement;
		if (element.classList.contains('listitem-wrapper')) {
			if (selectedIndex === index) {
				selectedIndex = null;
			} else {
				selectedIndex = index;
			}
		}
	};
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === 'Space') {
			if (selectedIndex === index) {
				selectedIndex = null;
			} else {
				selectedIndex = index;
			}
		}
	};

	const userRate = $derived(
		rate.find((r) => !!parentState.checked && r.parent === parentState.parent)?.rate
	);

	const vetos = $derived(veto?.filter((v) => v.veto));
	const vetoFromUser = $derived(vetos?.some((v) => v.parent === parentState.parent && !!v.veto));
</script>

<div
	tabindex="0"
	role="button"
	class={clsx('listitem-wrapper', deleting && 'opacity-50', themeClass)}
	onclick={onWrapperClick}
	onkeydown={onKeyDown}
>
	<div
		class={clsx(
			'listitem flex w-full flex-col gap-2 rounded-2xl px-5 pt-4 pb-2 ',
			open && 'item-open'
		)}
	>
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
			<form method="POST" class="flex-[2]" id={`rate-form-${name.toLowerCase()}`}>
				<RateInput
					value={userRate}
					debug={name === 'name A'}
					{onChangeHandler}
					changed={rateChanged}
					{loading}
				/>
			</form>
			<div class="flex flex-[1] justify-end">
				{#if loading}
					<div class="flex h-6 min-w-6 items-center justify-center">
						<i class="fa fa-spinner text-md animate-spin"></i>
					</div>
				{:else if rateChanged}
					<button
						class="action-button open-sans-regular rounded-xl px-2 py-1 text-sm text-[#918f8a]"
						form={`rate-form-${name.toLowerCase()}`}
						onclick={onRateSubmit}>Speichern</button
					>
				{:else}
					<RateDisplay {rate} veto={vetos} />
				{/if}
			</div>
		</div>
		<ActionsMenu
			{vetoFromUser}
			{vetoName}
			deleteName={onRequestDelete}
			{open}
			{removeVeto}
			deletable={parent === parentState.parent}
		/>
	</div>
</div>
<Modal bind:showModal onConfirm={onDelete}>
	<p class="open-sans-regular text-center text-lg text-[#918f8a]">
		Willst du wirklich <span class="open-sans-bold text-xl text-black">{name}</span> löschen?
	</p>
</Modal>
