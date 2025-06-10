import adapter from '@sveltejs/adapter-netlify';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: staticAdapter(adapter()) }
};

export default config;
