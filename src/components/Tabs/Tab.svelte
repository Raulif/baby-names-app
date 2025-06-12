<script lang="ts">
	import clsx from 'clsx';

	type Props = { label: string; onChange: (e: Event) => void; currentValue: string; id: string };
	const { currentValue, onChange, id, label }: Props = $props();
	const selected = $derived(currentValue === id);
</script>

<label
	class={clsx(
		'tab poppins-regular flex-[1]  overflow-hidden rounded-tl-xl rounded-tr-xl border-1  border-x-violet-700 border-t-violet-700 py-1 text-center',
		selected && ' raleway-bold  border-b-violet-700 bg-violet-100',
		!selected && ' z-0 border-b-violet-700 bg-violet-700 text-white '
	)}
>
	{label}
	<input
		type="radio"
		name="tabs"
		{id}
		onchange={onChange}
		class="visually-hidden"
		checked={selected}
	/>
</label>

<style>
	.tab {
		box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.7);
	}
</style>
