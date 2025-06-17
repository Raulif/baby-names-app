<script lang="ts">
	import GenderRadio from './GenderRadio.svelte';
</script>

<fieldset class="absolute flex right-2 gap-3">
	<GenderRadio
		id="gender-m"
		value="m"
		name="gender"
		label="Junge"
	/>

	<GenderRadio
		id="gender-f"
		value="f"
		name="gender"
		label="Mädchen"
	/>
</fieldset>
