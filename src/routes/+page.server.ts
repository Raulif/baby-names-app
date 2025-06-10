/** @satisfies {import('./$types').Actions} */
import type { Gender, Name, Parent } from '../types/types';
import { postNamesToDB, getNamesFromDB, updateNamesInDB } from '../db/names';
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
	}
};
