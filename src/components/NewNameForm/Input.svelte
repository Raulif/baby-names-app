<script lang="ts">
	import clsx from 'clsx';

	type Props = { name: string; label: string; value?: string };
	const { name, label }: Props = $props();
</script>

<label class={clsx('px-4', name === 'parent' ? 'visually-hidden' : 'flex flex-col gap-2')}>
	<span class="quicksand-700 text-md flex-[1]">{label}</span>
	<input class="rounded-sm border-black" {name} autocomplete="" />
</label>
