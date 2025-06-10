<script lang="ts">
	import { enhance } from '$app/forms';
	import GenderInput from './GenderInput.svelte';
	import Input from './Input.svelte';
</script>

<section class="border-t-[1px] border-t-gray-300 bg-white">
	<form class="flex flex-col gap-4 pt-4" method="POST" action="?/add" use:enhance>
		<Input name="name" label="Name eingeben" />
		<Input name="parent" label="User" value="papa" />
		<GenderInput />

		<button type="submit" class="mt-2 bg-orange-200 px-4 py-2">
			<span class="quicksand-700 text-xl"> Submit </span>
		</button>
	</form>
</section>

<style>
	section {
		box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.3);
	}
</style>
