<script lang="ts">
	import clsx from 'clsx';

	type Props = { name: string; label: string };
	const { name, label }: Props = $props();
</script>

<label class="flex flex-[2] flex-col gap-2">
	<span class="poppins-bold text-md flex-[1]">{label}</span>
	<input class="rounded-sm border-black px-3 py-1" {name} autocomplete="off" />
</label>
