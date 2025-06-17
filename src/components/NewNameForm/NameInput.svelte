<script lang="ts">
	type Props = { name: string; label: string };
	const { name, label }: Props = $props();
</script>

<input
	aria-label={label}
	class="open-sans-regular rounded-sm px-3 py-2"
	{name}
	autocomplete="off"
/>
