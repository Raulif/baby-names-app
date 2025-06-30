/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('activate', (e) => {
	console.log('[SERVICE WORKER] ACTIVATED: ', e)
});

self.addEventListener('push', (event) => {
	const message = event.data.text();
	const options = {
		body: message,
		icon: '/icon.png',
		badge: '/icon.png'
	};
	console.log('[SERVICE WORKER] MESSAGE IN PUSH EVENT')
	console.log({message})
	event.waitUntil(self.registration.showNotification('Baby Names App', options));
});
