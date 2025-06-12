<script lang="ts">
	import clsx from 'clsx';

	type Props = { label: string; onChange: (e: Event) => void; currentValue: string; id: string };
	const { currentValue, onChange, id, label }: Props = $props();
	const selected = $derived(currentValue === id);
</script>

<label
	class={clsx(
		'raleway-regular flex-[1]  rounded-tl-xl rounded-tr-xl border-1 border-t-violet-700 border-b-violet-100 py-1 text-center',
		selected && ' raleway-bold  bg-violet-100  ',
		!selected && 'border-y-violet-700 bg-violet-700 text-white '
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
