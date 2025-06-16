import { ConvexHttpClient } from 'convex/browser';

import { api } from '../convex/_generated/api';
import type { Id } from '../convex/_generated/dataModel';
import type { Name, GetNamesResult } from '../types/types';
import { namesStore } from '../store/namesStore';

const convex = new ConvexHttpClient('https://proficient-gecko-159.convex.cloud');

export const postNamesToDB = async (names: any) => await convex.mutation(api.names.post, { names });

export const getNamesFromDB = async (): GetNamesResult => await convex.query(api.names.get, {});

export const updateNamesInDB = async (id: Id<'names'>, names: Array<Name>) => {
	const store = namesStore.getState()
	store.setNames(names)
	return await convex.mutation(api.names.put, { id, names });
}
