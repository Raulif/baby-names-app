<script lang="ts">
	type Props = { name: string; label: string };
	const { name, label }: Props = $props();
</script>

<label class="flex flex-[2] flex-col gap-2">
	<span class="open-sans-bold text-md flex-[1]">{label}</span>
	<input class="open-sans-regular rounded-sm border-black px-3 py-2" {name} autocomplete="off" />
</label>
