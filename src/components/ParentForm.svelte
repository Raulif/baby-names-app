<script lang="ts">
	type Props = {
		onChange: (chosenParent: string) => void;
	};
	const { onChange }: Props = $props();
	const onSubmit = (e: SubmitEvent) => {
    e.preventDefault()
		const form = e.target as HTMLFormElement;
		const parent = (form.elements.namedItem('parent') as HTMLSelectElement)?.value;
		onChange(parent);
	};
</script>

<section>
	<form method="POST" onsubmit={onSubmit}>
		<select name="parent">
			<option value="mama">Mama</option>
			<option value="papa">Papa</option>
		</select>
		<input type="submit" title="save" />
	</form>
</section>
