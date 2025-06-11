/** @satisfies {import('./$types').Actions} */
import type { Gender, Name, Parent } from '../types/types';
import { postNamesToDB, getNamesFromDB, updateNamesInDB } from '../db/names';
import type { Id } from '../convex/_generated/dataModel';
export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const gender = data.get('gender');
		if (!name || !gender) return;

		const newNameEntry = {
			name: data.get('name') as string,
			parent: data.get('parent') as Parent,
			rate: [],
			gender: data.get('gender') as Gender
		};

		const { _id, names } = await getNamesFromDB();

		await updateNamesInDB(_id, [...(names || []), newNameEntry]);
	},
	rate: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const parent = data.get('parent');
		const rate = data.get('rate');
		const { _id, names } = await getNamesFromDB();

		const nameIndex = names.findIndex((n) => n.name === name);
		if (nameIndex === -1) return null;
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
