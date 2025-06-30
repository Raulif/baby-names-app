import { ConvexHttpClient } from 'convex/browser';

import { api } from '../convex/_generated/api';
import type { Id } from '../convex/_generated/dataModel';
import type { Name, GetNamesResult } from '../types/types';
import { namesStore } from '../store/namesStore';
import { PUBLIC_CONVEX_URL } from '$env/static/public';

const convex = new ConvexHttpClient(PUBLIC_CONVEX_URL);

export const postNamesToDB = async (names: Array<Name>) => {
	try {
		await convex.mutation(api.names.post, { names });
	} catch (e) {
		console.error('Error on Post Names to DB: ', e);
	}
};

export const getNamesFromDB = async (): Promise<GetNamesResult | null> => {
	try {
		return await convex.query(api.names.get, {});
	} catch (e) {
		console.log('Error on Get Names from DB: ', e);
		return null;
	}
};

export const updateNamesInDB = async (id: Id<'names'>, names: Array<Name>) => {
	try {
		const store = namesStore.getState();
		store.setNames(names);
		return await convex.mutation(api.names.put, { id, names });
	} catch (e) {
		console.error('Error in Update Names in DB: ', e);
	}
};
