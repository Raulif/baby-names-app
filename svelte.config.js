import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		ssr: false,
		prerender: {
			entries: [] // prevent prerendering
		}
	}
};

export default config;
