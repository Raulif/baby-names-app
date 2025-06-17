<script lang="ts">
	import { enhance } from '$app/forms';
	import GenderInput from './GenderInput.svelte';
	import { parentState } from '../../lib/parentState.svelte';
	import clsx from 'clsx';
	let isFocused = $state({ value: false });

	const onFocus = () => {
		isFocused.value = true;
	};
	const onBlur = () => {
		isFocused.value = false;
	};
</script>

<section class="">
	<form
		class="flex flex-col gap-5"
		method="POST"
		action={`?/add&parent=${parentState.parent}`}
		use:enhance
	>
		<div
			class={clsx(
				`relative flex items-center gap-3 overflow-hidden rounded-md border-1  pr-[90px]`,
				isFocused.value ? 'border-black outline-1' : 'border-[#b5b4a2]'
			)}
		>
			<input
				aria-label="Name eingeben"
				class="open-sans-regular w-full border-0 py-2 text-lg"
				name="name"
				autocomplete="off"
				onfocus={onFocus}
				onblur={onBlur}
				placeholder="Name eingeben"
			/>
			<GenderInput />
		</div>

		<button type="submit" class="w-full rounded-md bg-[#b5c8ae] py-2 disabled:bg-gray-400">
			<span class="open-sans-bold text-xl text-[#eef6e9]"> Speichern </span>
		</button>
	</form>
</section>

<style>
</style>
