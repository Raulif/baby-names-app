<script>
	import clsx from 'clsx';
	const { id, value, label, name, classes, icon } = $props();
</script>

<label
	for={id}
	class={clsx(
		'flex flex-[1] items-center justify-center rounded-sm border-1 p-2',
		classes,
		value === 'm' ? 'text-white has-checked:bg-blue-700' : 'text-white has-checked:bg-pink-600'
	)}
>
	<i class={clsx('fa', icon)}></i>
	<input type="radio" {name} {value} {id} class="visually-hidden" />
	<span class="visually-hidden">{label}</span>
</label>
