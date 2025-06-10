import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
		// VitePWA({
		// 	registerType: 'autoUpdate',
		// 	manifest: {
		// 		name: 'Baby Names App',
		// 		short_name: 'Baby Names App',
		// 		description: 'Baby Names App',
		// 		icons: [
		// 			{
		// 				src: '/static/icon.png',
		// 				sizes: '192x192',
		// 				type: 'image/png'
		// 			},
		// 			{
		// 				src: '/static/icon.png',
		// 				sizes: '512x512',
		// 				type: 'image/png'
		// 			}
		// 		],
		// 		start_url: '/',
		// 		display: 'standalone',
		// 		background_color: '#ffd6a8',
		// 		theme_color: '#ffd6a8'
		// 	}
		// })
	]
});
