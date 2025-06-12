import type { Parent } from '../types/types';

export const filteringState: { value: { filterUser: Parent | string; filterGender: string }; checked: boolean } = $state(
	{
		value: { filterUser: '', filterGender: '' },
		checked: false
	}
);
