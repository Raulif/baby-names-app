/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

sw.addEventListener('activate', (e) => {
	console.log('Service worker activated', e);
	const ev = e;
	// You can now use event.waitUntil(...)
});
