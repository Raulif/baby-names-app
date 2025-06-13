<script lang="ts">
	import { enhance } from '$app/forms';
	import GenderInput from './GenderInput.svelte';
	import Input from './Input.svelte';
	import { parentState } from '../../lib/parentState.svelte';
</script>

<section class="px-4 pt-3">
	<form
		class="flex flex-col gap-5"
		method="POST"
		action={`?/add&parent=${parentState.parent}`}
		use:enhance
	>
		<div class="flex flex-col gap-3">
			<Input name="name" label="Name eingeben" />
			<GenderInput />
		</div>

		<button type="submit" class="w-full rounded-md bg-[blueviolet] py-2 disabled:bg-gray-400">
			<span class="poppins-bold text-xl text-white"> Speichern </span>
		</button>
	</form>
</section>

<style>
</style>
