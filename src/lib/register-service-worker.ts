import { dev } from '$app/environment';
import { addNotificationListener } from './notifications';

export const registerServiceWorker = async () => {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register('/service-worker.js', {
				type: dev ? 'module' : 'classic'
			});
			await addNotificationListener()
		} catch (e) {
			console.error('Error while registering service worker: ', e);
		}
	}
};
