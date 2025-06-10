<script lang="ts">
	import RateInput from './RateInput.svelte';

	import { parentState } from '../../lib/parent.svelte';
	import type { Rate } from '../../types/types';
	const { name, rate } = $props();
</script>

<li class="w-full">
	<span>{name}</span>

	<span>{Math.round(rate.reduce((acc: number, r: Rate) => (acc += r.rate), 0))}</span>
	<form method="POST" action="?/update-rate">
		<input name="parent" value={parentState.parent} class="visually-hidden" />
		<input name="name" value={name} class="visually-hidden" />
		<RateInput />
	</form>
</li>
