/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { updateNotificationConsumption } from '$lib/notifications';

async function getClients() {
	return await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });
}

async function isClientFocused() {
	const clients = await getClients();
	const clientIsFocused = clients.reduce((focused, client) => focused || client.focused, false);
	return clientIsFocused;
}

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('activate', (e) => {
	console.log('[SERVICE WORKER] ACTIVATED: ', e);
});

self.addEventListener('push', async (event) => {
	const eventCallback = async () => {
		const data = JSON.parse(event.data.text());
		if (await isClientFocused()) {
			// Send message to focused window
			await getClients().forEach((client) => {
				client.postMessage(data)
			})
		} else {
			const options = {
				body: data.notification.text,
				icon: '/icon.png',
				badge: '/icon.png'
			};
			// Push notification
			self.registration.showNotification('Baby Names App', options);
		}
		const parent = data.notification.issuer === 'mama' ? 'papa' : 'mama';
		await updateNotificationConsumption(data.notification, parent);
	};
	event.waitUntil(eventCallback);
});
