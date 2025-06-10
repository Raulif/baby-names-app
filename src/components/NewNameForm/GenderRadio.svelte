<script>
	import clsx from 'clsx';
	const { id, selected, onChange, value, label, name, classes, selectedClasses, icon } = $props();
</script>

<label
	for={id}
	class={clsx(
		'flex flex-[1] items-center justify-center p-2 rounded-sm',
		classes,
		selected === value && selectedClasses
	)}
>
	<i class={clsx('fa', icon)}></i>
	<input onchange={onChange} type="radio" {name} {value} {id} class="visually-hidden" />
	<span class="visually-hidden">{label}</span>
</label>
