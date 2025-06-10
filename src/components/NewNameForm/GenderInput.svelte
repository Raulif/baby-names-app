<script lang="ts">
	import GenderRadio from './GenderRadio.svelte';

	const gender = $state({ value: '' });
	const onChange = (e: Event) => {
		const radio = e.target as HTMLInputElement;
		const value = radio.value;
		gender.value = value;
		console.log(e);
	};
</script>

<fieldset class="w-full px-4">
	<div class="flex w-full flex-col gap-2">
		<span class="quicksand-700 text-md w-full flex-[1]">Geschlecht auswählen</span>
		<span class="flex gap-4">
			<GenderRadio
				id="gender-m"
				value="m"
				{onChange}
				name="gender"
				selected={gender.value}
				label="Junge"
				classes="border-1 border-blue-700 text-blue-700"
				selectedClasses="bg-blue-700 text-white"
				icon="fa-child"
			/>

			<GenderRadio
				id="gender-f"
				value="f"
				{onChange}
				name="gender"
				selected={gender.value}
				label="Mädchen"
				classes="border-1 border-pink-700 text-pink-700"
				selectedClasses="bg-pink-700 text-white"
				icon="fa-child-dress"
			/>
		</span>
	</div>
</fieldset>
