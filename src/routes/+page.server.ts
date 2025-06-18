/** @satisfies {import('./$types').Actions} */
import type { RequestEvent } from '@sveltejs/kit';
import type { Gender, Parent } from '../types/types';
import { updateNamesInDB } from '../db/names';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';
import { PUBLIC_CONVEX_URL } from '$env/static/public';

import { namesStore } from '../store/namesStore';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const client = new ConvexHttpClient(PUBLIC_CONVEX_URL!);
	const response = await client.query(api.names.get, {});

	if (!response.names?.length) return;
	namesStore.getState().setNames(response.names);
	namesStore.getState().set_Id(response._id);
}

export const actions = {
	add: async (event: RequestEvent) => {
		const params = event.url.searchParams;
		const data = await event.request.formData();
		const name = data.get('name');
		const gender = data.get('gender');
		const { _id, names } = namesStore.getState();
		const exists = names.find((n) => n.name === name);

		if (!name || !gender || exists) return false;

		const newNameEntry = {
			name: data.get('name') as string,
			parent: params.get('parent') as Parent,
			rate: [],
			gender: data.get('gender') as Gender,
			veto: []
		};

		await updateNamesInDB(_id, [...(names || []), newNameEntry]);
		return true;
	},
	rate: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const name = data.get('name');
		const parent = data.get('parent');
		const rate = data.get('rate');
		const { _id, names } = namesStore.getState();

		const nameIndex = names.findIndex((n) => n.name === name);

		if (nameIndex === -1) return false;

		const rateIndex = names[nameIndex]?.rate.findIndex((r) => r.parent === parent);
		if (rateIndex === -1) {
			names[nameIndex].rate.push({
				parent: parent as unknown as Parent,
				rate: parseInt(rate as unknown as string)
			});
		} else {
			names[nameIndex].rate[rateIndex].rate = parseInt(rate as unknown as string);
		}

		await updateNamesInDB(_id, names);
		return true;
	},
	delete: async ({ request }: RequestEvent) => {
		const { name } = await request.json();
		const { _id, names } = namesStore.getState();
		const filtered = names.filter((n) => n.name !== name);

		await updateNamesInDB(_id, filtered);

		return true;
	},
	veto: async (event: RequestEvent) => {
		const { name, veto } = await event.request.json();
		const { _id, names } = namesStore.getState();
		const nameIndex = names.findIndex((n) => n.name === name);
		if (nameIndex === -1) return false;

		if (!names[nameIndex].veto?.length) {
			names[nameIndex].veto = [veto];
		} else {
			const vetoIndex = names[nameIndex].veto.findIndex((v) => v.parent === veto.parent);
			if (vetoIndex !== -1) {
				names[nameIndex].veto[vetoIndex] = veto;
			} else {
				names[nameIndex].veto.push(veto);
			}
		}
		await updateNamesInDB(_id, names);
		return true;
	}
	// updateAll: async () => {
	// 	const { _id, names } = await getNamesFromDB();
	// 	const updated = names.map((n) => ({ ...n, veto: [] }));
	// 	await updateNamesInDB(_id, updated);
	// 	return true;
	// }
};
