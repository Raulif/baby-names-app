export const requestNotificationPermission = async () => {
	const permission = await window.Notification.requestPermission();
};
