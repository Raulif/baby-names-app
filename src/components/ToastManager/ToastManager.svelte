<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	import Toast from '../Toast/Toast.svelte';
	import { dismissToast, toasts } from '../../store/toastStore';
</script>

{#if $toasts}
	<ul class="toast-manager fixed bottom-12 py-0 px-3 left-0 right-0 w-full flex justify-center flex-col z-[1000]">
		{#each $toasts as toast (toast._id)}
			<li in:fade={{ duration: 150 }} out:fly={{ y: -10 }}>
				<Toast {...toast} onDismiss={() => dismissToast(toast._id)} />
			</li>
		{/each}
	</ul>
{/if}
