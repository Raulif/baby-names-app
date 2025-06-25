import { dev } from '$app/environment';

export const registerServiceWorker = async () => {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register('/service-worker.js', {
				type: dev ? 'module' : 'classic'
			});
		} catch (e) {
			console.error('Error while registering service worker: ', e);
		}
	}
};
