<script>
	import clsx from 'clsx';
	const { id, value, label, name } = $props();
</script>

<label
	for={id}
	class={clsx(
		'flex h-8 w-8 items-center justify-center rounded-full text-sm',
		value === 'm' &&
			'bg-[#e9f2ef] text-[#98b2b8] has-checked:bg-[#98b2b8] has-checked:text-[#e9f2ef]',
		value !== 'm' &&
			'bg-[#fae5e2] text-[#d69d95] has-checked:bg-[#d69d95] has-checked:text-[#fae5e2]'
	)}
>
	<i class="fa fa-user text-sm"></i>
	<input type="radio" {name} {value} {id} class="visually-hidden" />
	<span class="visually-hidden">{label}</span>
</label>
