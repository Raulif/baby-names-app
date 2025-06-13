import type { FilteringStateValue, Parent } from '../types/types';

type FilteringState = {
	value: FilteringStateValue;
	checked: boolean;
};

export const filteringState: FilteringState = $state({
	value: { filterUser: '', filterGender: '', filterRating: '' },
	checked: false
});
