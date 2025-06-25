/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('activate', (e) => {
	console.log('Service worker activated', e);
	const ev = e;
});

self.addEventListener('push', (event) => {
	const data = event.data.json();
	const options = {
		body: data.body
		// icon: 'images/notification-icon.png',
		// badge: 'images/notification-badge.png'
	};

	event.waitUntil(self.registration.showNotification(data.title || 'Push notification', options));
});
