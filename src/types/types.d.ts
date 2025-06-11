export type Name = {
	name: string;
	parent: Parent;
	rate: Array<Rate>;
  gender: Gender;
};

export type Rate = { rate: number; parent: Parent };

export type Parent = 'papa' | 'mama';

export type Gender = 'm' | 'f'

export type GetNamesResult = Promise<{ _id: Id<'names'>; names: Array<Name> }>