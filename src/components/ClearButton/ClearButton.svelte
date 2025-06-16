<script lang="ts">
	import clsx from 'clsx';

	type Props = {
		active: boolean;
		onClick: () => void;
		ariaLabel?: string;
		label?: string;
    classes?: string;
	};

	const { label, active, onClick, ariaLabel, classes }: Props = $props();
</script>

<button
	class={clsx(
		'poppins-regular flex min-h-5 min-w-5 items-center justify-center gap-2 rounded-full bg-violet-800 text-white transition-transform',
    classes,
		active && 'pointer-events-auto scale-100',
		!active && 'pointer-events-none scale-0'
	)}
	aria-label={ariaLabel || `Filter entfernen für Kategorie: `}
	onclick={onClick}
>
	{label || ''}
	<i class="fa fa-xmark"></i>
</button>
