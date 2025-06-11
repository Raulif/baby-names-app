<script lang="ts">
	import GenderRadio from './GenderRadio.svelte';
</script>

<fieldset class="w-full px-4">
	<div class="flex w-full flex-col gap-2">
		<span class="quicksand-700 text-md w-full flex-[1]">Geschlecht auswählen</span>
		<span class="flex gap-4">
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
				classes="border-pink-700 text-pink-700 bg-pink-200"
				icon="fa-child-dress"
			/>
		</span>
	</div>
</fieldset>
