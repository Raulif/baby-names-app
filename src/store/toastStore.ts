import { writable } from 'svelte/store';
import type { ClassNumber, Toast } from '../types/types';
import { getThemeClass } from '$lib/helpers';

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Partial<Toast>) => {
	const themeClass = getThemeClass((new Date().getTime() % 5) as ClassNumber);
	const newToast = { timeout: 5000, themeClass, ...toast } as Toast;
	// Push the toast to the top of the list of toasts
	toasts.update((all) => [newToast, ...all]);
	// If toast hast timeout, dismiss it after "timeout" amount of time.
	if (newToast.timeout) setTimeout(() => dismissToast(newToast._id), newToast.timeout);
};

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t._id !== id));
};
