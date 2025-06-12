/** @satisfies {import('./$types').Actions} */
import type { Gender, Parent } from '../types/types';
import { getNamesFromDB, updateNamesInDB } from '../db/names';
export const actions = {
	add: async (event) => {
		const params = event.url.searchParams;
		const data = await event.request.formData();
		const name = data.get('name');
		const gender = data.get('gender');
		const { _id, names } = await getNamesFromDB();
		const exists = names.find((n) => n.name === name);
		
		if (!name || !gender || exists) return false;

		const newNameEntry = {
			name: data.get('name') as string,
			parent: params.get('parent') as Parent,
			rate: [],
			gender: data.get('gender') as Gender
		};

		await updateNamesInDB(_id, [...(names || []), newNameEntry]);
		return true;
	},
	rate: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const parent = data.get('parent');
		const rate = data.get('rate');
		const { _id, names } = await getNamesFromDB();

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
	delete: async ({ request }) => {
		const { name } = await request.json();
		const { _id, names } = await getNamesFromDB();
		const filtered = names.filter((n) => n.name !== name);

		await updateNamesInDB(_id, filtered);

		return true;
	}
};
