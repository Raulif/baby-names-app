import { PUBLIC_NOTIFICATION_SERVER_URL } from '$env/static/public';
import type { EventNotificationRequestData, EventNotification } from '../types/types';
import { parentState } from './parentState.svelte';
import { permissionState } from './permissionState.svelte';
import { addToast } from '../store/toastStore';

function urlBase64ToUint8Array(base64String: string) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

const fetchPublicVapidKey = async () => {
	const vapidResponse = await fetch(`${PUBLIC_NOTIFICATION_SERVER_URL}/public-vapid-key`);
	const responseJson = await vapidResponse.json();
	if (responseJson.publicVapidKey) {
		return responseJson.publicVapidKey;
	}
};

const storeSubscriptionInDB = async (subscription: PushSubscription) => {
	const subscriptionResponse = await fetch(`${PUBLIC_NOTIFICATION_SERVER_URL}/subscription`, {
		method: 'POST',
		body: JSON.stringify({ subscription, user: parentState.parent })
	});
	const subscriptionJson = await subscriptionResponse.json();
};

const initializePush = async () => {
	try {
		const registration = await navigator.serviceWorker.ready;
		const existingSubscription = await registration.pushManager.getSubscription();
		if (existingSubscription) {
			await storeSubscriptionInDB(existingSubscription);
		} else {
			const publicVapidKey = await fetchPublicVapidKey();

			const newSubscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
			});
			await storeSubscriptionInDB(newSubscription);
		}
	} catch (e) {
		console.error('Failed to subscribe to push:', e);
	}
};

export const checkNotificationPermission = async () => {
	if ('Notification' in window && navigator.serviceWorker) {
		const permission = await window.Notification.permission;
		if (permission === 'granted') {
			initializePush();
		}
		if (!permissionState.checked) {
			permissionState.permission = permission;
			permissionState.checked = true;
		}
	}
};

export const requestNotificationPermission = async () => {
	if ('Notification' in window && navigator.serviceWorker) {
		const permission = await window.Notification.requestPermission();

		if (permission === 'granted') {
			initializePush();
		}
		permissionState.permission = permission;
	}
};

const sendNotification = async (data: EventNotificationRequestData) => {
	try {
		const response = await fetch(`${PUBLIC_NOTIFICATION_SERVER_URL}/notification`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (e) {
		console.error('error while sending notification');
		console.error(e);
	}
};

export const sendNewNameNotification = async (name: string, parent: string) =>
	await sendNotification({
		name,
		user: parent,
		eventType: 'new'
	});

export const sendRateNotification = async (name: string, parent: string, rate: string) =>
	await sendNotification({
		name,
		user: parent,
		eventType: 'rate',
		rate
	});

export const sendDeleteNotification = async (name: string, parent: string) =>
	await sendNotification({ name, user: parent, eventType: 'delete' });

export const sendVetoNotification = async (name: string, parent: string) =>
	await sendNotification({ name, user: parent, eventType: 'veto' });

export const sendUnvetoNotification = async (name: string, parent: string) =>
	await sendNotification({ name, user: parent, eventType: 'unveto' });

export const addNotificationListener = async () => {
	navigator.serviceWorker.addEventListener('message', (event) => {
		const notification: EventNotification = event.data.notification;
		console.log({ notification });
		addToast(notification);
	});
};

export const updateNotificationConsumption = async (
	notification: EventNotification,
	parent: string
) => {
	try {
		const response = await fetch(
			`${PUBLIC_NOTIFICATION_SERVER_URL}/notification?id=${notification._id}&user=${parent}`,
			{
				method: 'PATCH'
			}
		);
		const responseJson = await response.json();
		return responseJson;
	} catch (e) {
		console.error('Error while updating notification');
		console.error(e);
	}
};
