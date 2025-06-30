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

<div class="app">
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		max-width: 500px;
		margin: 0 auto;
		max-height: 100dvh;
		max-height: 100vh;
		overflow: hidden;
		background-color: #f3f0e9;
	}
</style>
