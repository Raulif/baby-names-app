import type { Name, Parent, FilteringStateValue } from '../types/types';

export const sortAlphabeticallyDescending = (a: Name, b: Name) =>
	a.name < b.name ? 1 : a.name > b.name ? -1 : 0;

export const sortAlphabeticallyAscending = (a: Name, b: Name) =>
	a.name > b.name ? 1 : a.name < b.name ? -1 : 0;

export const sortRatingAscending = (a: Name, b: Name) => {
	if (a.veto?.some((v) => v.veto)) {
		return -1;
	} else if (b.veto?.some((v) => v.veto)) {
		return 1;
	}
	const averageA = Math.round(a.rate.reduce((acc, r) => (acc += r.rate), 0)) / a.rate.length;
	const averageB = Math.round(b.rate.reduce((acc, r) => (acc += r.rate), 0)) / b.rate.length;
	return averageA > averageB ? 1 : averageA < averageB ? -1 : 0;
};
export const sortRatingDescending = (a: Name, b: Name) => {
	if (a.veto?.some((v) => v.veto)) {
		return 1;
	} else if (b.veto?.some((v) => v.veto)) {
		return -1;
	}
	const averageA = Math.round(a.rate.reduce((acc, r) => (acc += r.rate), 0)) / a.rate.length;
	const averageB = Math.round(b.rate.reduce((acc, r) => (acc += r.rate), 0)) / b.rate.length;
	return averageA < averageB ? 1 : averageA > averageB ? -1 : 0;
};

export const filterNames = (names: Array<Name>, filters: FilteringStateValue, parent: Parent) => {
	let filtered = [...names].filter((name) => {
		if (filters.filterGender && name.gender !== filters.filterGender) {
			return false;
		}
		if (filters.filterUser && filters.filterUser !== name.parent) {
			return false;
		}

		if (filters.filterRating === 'true' && !name.rate.some((r) => r.parent === parent)) {
			return false;
		} else if (filters.filterRating === 'false' && name.rate.some((r) => r.parent === parent)) {
			return false;
		}
		return true;
	});
	return filtered;
};

export const sortNames = (names: Array<Name>, sorting: string) => {
	switch (sorting) {
		case 'alphabetical-desc':
			names.sort(sortAlphabeticallyDescending);
			break;
		case 'alphabetical-asc':
			names.sort(sortAlphabeticallyAscending);
			break;
		case 'rating-asc':
			names.sort(sortRatingAscending);
			break;
		case 'rating-desc':
			names.sort(sortRatingDescending);
			break;
		default:
			break;
	}
	return [...names];
};
