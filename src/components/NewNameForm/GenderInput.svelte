<script lang="ts">
	import GenderRadio from './GenderRadio.svelte';
</script>

<fieldset class="w-full flex-[1]">
	<div class="flex w-full flex-col gap-2">
		<span class="poppins-bold text-md w-full flex-[1]">Geschlecht </span>
		<span class="flex gap-2">
			<GenderRadio
				id="gender-m"
				value="m"
				name="gender"
				label="Junge"
				classes="border-blue-700 text-blue-700 bg-blue-100"
				icon="fa-child"
			/>

			<GenderRadio
				id="gender-f"
				value="f"
				name="gender"
				label="Mädchen"
				classes="border-pink-600 text-pink-600 bg-pink-200"
				icon="fa-child-dress"
			/>
		</span>
	</div>
</fieldset>
