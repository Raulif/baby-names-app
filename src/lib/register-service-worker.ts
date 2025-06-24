import { dev } from '$app/environment';
import { PUBLIC_VAPID_KEY } from '$env/static/public';

export const registerServiceWorker = async () => {
	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register('/service-worker.js', {
				type: dev ? 'module' : 'classic'
			});
			console.log({ registration });
			const subscription = await registration.pushManager.getSubscription();
			if (subscription) {
				console.log({ subscription });
				return subscription
			} else {
				const newSubscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
				})
				console.log({newSubscription})
			}


			console.log('not subscribed');
		} catch (e) {
			console.error({ error: e });
		}
	}
};


function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}