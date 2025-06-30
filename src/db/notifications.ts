import { ConvexHttpClient } from 'convex/browser';

import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { api } from '../convex/_generated/api';
import type { EventNotification } from '../types/types';

const convex = new ConvexHttpClient(PUBLIC_CONVEX_URL);

export const updateNotificationConsumption = async (
	notification: EventNotification,
	parent: string
) => {
	const atIndex = notification.consumptions.findIndex((c) => c.user === parent);
	if (atIndex !== -1) {
		notification.consumptions[atIndex].consumed = true;
		return await convex.mutation(api.notifications.update, { id: notification._id, notification });
	}
};
