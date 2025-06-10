import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const Rate = { rate: v.number(), parent: v.string() };
const Name = v.object({
	name: v.string(),
	parent: v.string(),
	rate: v.array(v.object(Rate)),
	gender: v.string()
});

export const post = mutation({
	handler: async (ctx, args) => {
		return await ctx.db.insert('names', { names: args.names });
	}
});

export const get = query({
	args: {},
	handler: async (ctx) => {
		const response = await ctx.db.query('names').collect();
		return response[0];
	}
});

export const put = mutation({
	args: {
		id: v.id('names'),
		names: v.array(Name)
	},
	handler: async (ctx, args) => {
		const { id, names } = args;
		return await ctx.db.patch(id, { names });
	}
});
