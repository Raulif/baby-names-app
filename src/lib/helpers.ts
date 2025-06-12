import type { Name } from '../types/types';

export const sortAlphabeticallyDescending = (a: Name, b: Name) =>
	a.name < b.name ? 1 : a.name > b.name ? -1 : 0;

export const sortAlphabeticallyAscending = (a: Name, b: Name) =>
	a.name > b.name ? 1 : a.name < b.name ? -1 : 0;

export const sortRatingAscending = (a: Name, b: Name) => {
	const averageA = Math.round(a.rate.reduce((acc, r) => (acc += r.rate), 0)) / a.rate.length;
	const averageB = Math.round(b.rate.reduce((acc, r) => (acc += r.rate), 0)) / b.rate.length;
	return averageA > averageB ? 1 : averageA < averageB ? -1 : 0;
};
export const sortRatingDescending = (a: Name, b: Name) => {
	const averageA = Math.round(a.rate.reduce((acc, r) => (acc += r.rate), 0)) / a.rate.length;
	const averageB = Math.round(b.rate.reduce((acc, r) => (acc += r.rate), 0)) / b.rate.length;
	return averageA < averageB ? 1 : averageA > averageB ? -1 : 0;
};
