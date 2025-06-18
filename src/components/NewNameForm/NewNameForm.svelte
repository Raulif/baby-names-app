<script lang="ts">
	import clsx from 'clsx';
	import { enhance } from '$app/forms';
	import GenderRadio from './GenderRadio.svelte';
	import { parentState } from '../../lib/parentState.svelte';

	let isFocused = $state(false);

	const onFocus = () => {
		isFocused = true;
	};
	const onBlur = () => {
		isFocused = false;
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
				isFocused ? 'border-black outline-1' : 'border-[#b5b4a2]'
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
				data-testid="name-input"
			/>
			<fieldset class="absolute right-2 flex gap-3">
				<GenderRadio id="gender-m" value="m" name="gender" label="Junge" />
				<GenderRadio id="gender-f" value="f" name="gender" label="Mädchen" />
			</fieldset>
		</div>

		<button
			data-testid="add-name-button"
			type="submit"
			class="w-full rounded-md bg-[#b5b4a2] py-2 disabled:bg-gray-400"
		>
			<span class="open-sans-bold text-xl text-[#eef6e9]">Speichern</span>
		</button>
	</form>
</section>

<style>
</style>
