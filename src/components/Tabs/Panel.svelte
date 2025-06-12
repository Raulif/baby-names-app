<script lang="ts">
	import clsx from 'clsx';

	type Props = {
		visible: boolean;
		children: any;
	};
	const { visible, children }: Props = $props();
</script>

<div
	class={clsx(
		'absolute top-0 h-[144px] w-full bg-violet-100',
		visible ? '' : 'pointer-events-none z-0 opacity-0'
	)}
>
	{@render children()}
</div>
