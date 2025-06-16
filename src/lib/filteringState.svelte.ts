import type { FilterStateValue, Parent } from '../types/types';

type FilteringState = {
	value: FilterStateValue;
	checked: boolean;
};

export const filteringState: FilteringState = $state({
	value: { filterUser: '', filterGender: '', filterRating: '' },
	checked: false
});
