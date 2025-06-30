<script lang="ts">
	import { parentState } from '$lib/parentState.svelte';
	import ParentSelectView from '../views/ParentSelectView.svelte';
	import MainView from '../views/MainView.svelte';

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
	<MainView />
{/if}
