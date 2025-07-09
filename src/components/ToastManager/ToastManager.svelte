<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import Toast from '../Toast/Toast.svelte';

	import { dismissToast, toasts } from '../../store/toastStore';
</script>

{#if $toasts}
	<ul class="toast-manager">
		{#each $toasts as toast (toast._id)}
			<li in:fade={{ duration: 150 }} out:fly={{ y: -10 }}>
				<Toast {...toast} onDismiss={() => dismissToast(toast._id)} />
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul.toast-manager {
		position: fixed;
		bottom: 3rem;
		padding: 0 0.75rem;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		z-index: 1000;
	}
</style>
