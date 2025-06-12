<script lang="ts">
	import { enhance } from '$app/forms';
	import GenderInput from './GenderInput.svelte';
	import Input from './Input.svelte';
	import { parentState } from '../../lib/parentState.svelte';
</script>

<section class="pt-3 border-t-violet-100 border-t-1">
	<form
		class="flex flex-col gap-4"
		method="POST"
		action={`?/add&parent=${parentState.parent}`}
		use:enhance
	>
		<div class="flex gap-4 px-4">
			<Input name="name" label="Name eingeben" />
			<GenderInput />
		</div>

		<button type="submit" class="mt-2 bg-[blueviolet] px-4 py-2 disabled:bg-gray-400">
			<span class="poppins-bold text-xl text-white"> Speichern </span>
		</button>
	</form>
</section>

<style>
</style>
