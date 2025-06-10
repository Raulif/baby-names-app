<script lang="ts">
	import '../app.css';

	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { browser } from '$app/environment';

	import { parentState } from '../lib/parent.svelte';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);

	if (browser) {
		const storedParent = localStorage.getItem('parent');
		if (storedParent) {
			parentState.parent = storedParent;
		}
		parentState.checked = true;
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
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		max-width: 500px;
		margin: 0 auto;
		gap: 16px;
	}
</style>
