<script lang="ts">
	import { enhance } from '$app/forms';
	import GenderInput from './GenderInput.svelte';
	import Input from './Input.svelte';

</script>

<section class="max-h-[240px] border-t-[1px] border-t-gray-300 bg-violet-100">
	<form class="flex flex-col gap-4 pt-2" method="POST" action="?/add" use:enhance>
		<Input name="name" label="Name eingeben"/>
		<Input name="parent" label="User" value="papa" />
		<GenderInput  />

		<button type="submit" class="mt-2 bg-[blueviolet] px-4 py-2 disabled:bg-gray-400" >
			<span class="quicksand-700 text-lg text-white"> Speichern </span>
		</button>
	</form>
</section>

<style>
	section {
		box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.3);
	}
</style>
