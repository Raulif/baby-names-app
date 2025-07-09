<script lang="ts">
	import '../app.css';

	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { browser } from '$app/environment';
	import { checkNotificationPermission } from '$lib/notifications';
	import { registerServiceWorker } from '$lib/register-service-worker';

	import { parentState } from '../lib/parentState.svelte';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);

	if (browser) {
		const storedParent = localStorage.getItem('parent');
		if (storedParent) {
			parentState.parent = storedParent;
		}
		parentState.checked = true;
		registerServiceWorker()
		checkNotificationPermission();
	}
</script>

<div class="app flex flex-col min-h-screen">
	<main class="flex flex-[1] flex-col justify-end w-full my-0 mx-[auto] max-w-[500px] max-h-[100dvh] overflow-hidden bg-[#f3f0e9]">
		{@render children()}
	</main>
</div>

