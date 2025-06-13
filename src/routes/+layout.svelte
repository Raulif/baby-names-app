<script lang="ts">
	import '../app.css';

	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { browser } from '$app/environment';

	import { parentState } from '../lib/parentState.svelte';

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

