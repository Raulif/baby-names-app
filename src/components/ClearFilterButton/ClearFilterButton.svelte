<script lang="ts">
	type Props = {
		onClear: () => void;
		label?: string;
	};
	const { onClear, label }: Props = $props();
</script>

<button
	onclick={onClear}
	class="poppins-regular flex items-center gap-2 rounded-2xl bg-violet-800 px-2 text-white"
	><i class="fa fa-xmark"></i>{label || 'Entfernen'}</button
>
