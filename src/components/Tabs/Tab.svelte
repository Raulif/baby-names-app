<script lang="ts">
	import clsx from 'clsx';

	type Props = { label: string; onChange: (e: Event) => void; currentValue: string; id: string };
	const { currentValue, onChange, id, label }: Props = $props();
	const selected = $derived(currentValue === id);
</script>

<label
	class={clsx(
		'tab poppins-regular flex-[1]  overflow-hidden rounded-tl-xl rounded-tr-xl border-1  border-violet-700  py-1 text-center',
		selected && ' raleway-bold   bg-violet-700 text-white ',
		!selected && ' z-0  bg-violet-300 text-black '
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

</style>
