import type { VectorFilterBuilder } from 'convex/server';

export type Name = {
	name: string;
	parent: Parent;
	rate: Array<Rate>;
	gender: Gender;
	veto: Array<Veto>;
};

export type Veto = { veto: boolean; parent: Parent };

export type Rate = { rate: number; parent: Parent };

export type Parent = 'papa' | 'mama';

export type Gender = 'm' | 'f';

export type GetNamesResult = Promise<{ _id: Id<'names'>; names: Array<Name> }>;

export type FilterCategory = 'filterUser' | 'filterGender' | 'filterRating';

export type FilterStateValue = {
	filterUser: FilterUser;
	filterGender: FilterGender;
	filterRating: FilterRating;
};

export type FilterUser = Parent | string;
export type FilterGender = string;
export type FilterRating = string;
export type ClassNumber = '1' | '2' | '3' | '4' | '0';
