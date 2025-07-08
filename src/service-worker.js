/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { PUBLIC_NOTIFICATION_SERVER_URL } from '$env/static/public';

async function getClients() {
	return await clients.matchAll({
		type: 'window',
		includeUncontrolled: true
	});
}

const updateNotificationConsumption = async (notificationId, user) => {
	try {
		const response = await fetch(`${PUBLIC_NOTIFICATION_SERVER_URL}/notification/update`, {
			method: 'POST',
			body: JSON.stringify({ id: notificationId, user })
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (e) {
		console.error('Error while updating notification');
		console.error(e);
	}
};

async function isClientFocused() {
	const clients = await getClients();
	const clientIsFocused = clients.reduce((focused, client) => focused || client.focused, false);
	return clientIsFocused;
}

async function getMatchingClient(url) {
	const urlToOpen = new URL(url).href;
	const clients = await getClients();
	let matchingClient;
	clients.forEach((c) => {
		if (matchingClient) return;
		if (client.url === urlToOpen) {
			matchingClient = client;
		}
	});
	return matchingClient;
}

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('activate', (e) => {
	console.log('[SERVICE WORKER] ACTIVATED: ', e);
});

self.addEventListener('push', (event) => {
	async function onPush() {
		const data = JSON.parse(event.data.text());
		const isFocused = await isClientFocused();
		if (isFocused) {
			// Send message to focused window
			const clients = await getClients();
			clients.forEach((client) => {
				client.postMessage(data);
			});
		} else {
			const options = {
				body: data.notification.text,
				icon: '/icon.png',
				badge: '/icon.png'
			};
			// Send push notification to inactive app
			self.registration.showNotification('Baby Names App', options);
		}
		const parent = data.notification.issuer === 'mama' ? 'papa' : 'mama';
		await updateNotificationConsumption(data.notification._id, parent);
	}
	event.waitUntil(onPush());
});

self.addEventListener('notificationclick', (e) => {
	async function onClick() {
		const matchingClient = await getMatchingClient(self.location.origin);
		if (matchingClient) {
			matchingClient.focus();
		} else {
			clients.openWindow(new URL(self.location.origin).href);
		}
		return notification.close();
	}
	e.waitUntil(onClick());
});
