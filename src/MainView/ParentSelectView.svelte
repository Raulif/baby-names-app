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

<section class="flex flex-col items-center justify-center gap-4 bg-violet-100">
	<form
		method="POST"
		onsubmit={onSubmit}
		class="flex w-full max-w-[80vw] flex-col gap-4"
	>
		<label for="parent-select" class="open-sans-bold w-[80vw] text-left">
			Wähle deine Role aus:
		</label>
		<select name="parent" id="parent-select" class="w-full" data-testid="parent-select">
			<option value="">Auswählen</option>
			<option value="mama">Mama</option>
			<option value="papa">Papa</option>
		</select>
		<input
		data-testid="parent-select-submit"
			type="submit"
			title="save"
			class="rounded-sm bg-[blueviolet] py-2 text-white"
		/>
	</form>
</section>

<style>
	section {
		height: 100dvh;
		height: 100vh;
	}
</style>
