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

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('activate', (e) => {
	console.log('[SERVICE WORKER] ACTIVATED: ', e);
});

self.addEventListener('push', async (event) => {
	const data = JSON.parse(event.data.text());
	console.log({ focused: await isClientFocused() });
	if (await isClientFocused()) {
		// Send message to focused window
		const clients = await getClients()
		clients.forEach((client) => {
			console.log({ client, data });
			client.postMessage(data);
		});
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
	await updateNotificationConsumption(data.notification._id, parent);
});
