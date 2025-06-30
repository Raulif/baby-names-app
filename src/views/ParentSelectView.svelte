<script lang="ts">
	type Props = {
		onChange: (chosenParent: string) => void;
	};
	const { onChange }: Props = $props();
	const onSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const parent = (form.elements.namedItem('parent') as HTMLSelectElement)
			?.value;
		if (!parent) return;
		onChange(parent);
	};
</script>

<section class="flex flex-col items-center justify-center gap-4">
	<form
		method="POST"
		onsubmit={onSubmit}
		class="flex w-full max-w-[80vw] flex-col gap-4"
	>
		<label for="parent-select" class="open-sans-bold w-full text-left">
			Wähle deine Role aus:
		</label>
		<select
			name="parent"
			id="parent-select"
			class="open-sans-bold w-full"
			data-testid="parent-select"
		>
			<option value="">Auswählen</option>
			<option value="mama">Mama</option>
			<option value="papa">Papa</option>
		</select>
		<input
			data-testid="parent-select-submit"
			type="submit"
			title="save"
			class="open-sans-bold w-full rounded-md bg-[#b5b4a2] py-2 text-xl text-[#eef6e9] disabled:bg-gray-400"
		/>
	</form>
</section>

<style>
	section {
		height: 100dvh;
		height: 100vh;
	}
</style>
