<script lang="ts">
	import { parentState } from '$lib/parentState.svelte';
	import ParentSelectView from '../MainView/ParentSelectView.svelte';
	import ListView from '../MainView/MainView.svelte';

	const onParentChange = (chosenParent: string) => {
		parentState.parent = chosenParent;
		localStorage.setItem('parent', chosenParent);
	};

</script>

<svelte:head>
	<title>Familia Baby Names</title>
	<meta name="description" content="Familia Baby Names" />
</svelte:head>
{#if !parentState.checked}
	Loading User...
{:else if !parentState.parent}
	<ParentSelectView onChange={onParentChange} />
{:else}
	<ListView />
{/if}
