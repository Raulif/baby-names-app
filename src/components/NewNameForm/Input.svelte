<script lang="ts">
	import clsx from 'clsx';

	type Props = { name: string; label: string };
	const { name, label }: Props = $props();
</script>

<label class="flex flex-col gap-2 px-4">
	<span class="quicksand-700 text-md flex-[1]">{label}</span>
	<input class="rounded-sm border-black" {name} autocomplete="off" />
</label>
