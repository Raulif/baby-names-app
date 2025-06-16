import  {createStore}  from 'zustand/vanilla';
import type { Name } from '../types/types';
import type { Id } from '../convex/_generated/dataModel';

type StoreType = {
	names: Array<Name>;
	_id: Id<'names'>;
	setNames: (names: Array<Name>) => void;
	set_Id: (_id: Id<'names'>) => void;
};

export const namesStore = createStore<StoreType>((set) => ({
	names: [],
	_id: '' as Id<'names'>,
	setNames: (names) => set({ names }),
	set_Id: (_id) => set({ _id })
}));
