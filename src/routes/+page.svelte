<script lang="ts">
	import { parentState } from '$lib/parentState.svelte';
	import ParentForm from '../components/ParentForm.svelte';
	import ListView from '../ListView/ListView.svelte';

	const onParentChange = (chosenParent: string) => {
		localStorage.setItem('parent', chosenParent);
		parentState.parent = chosenParent;
	};
</script>

<svelte:head>
	<title>Familia Baby Names</title>
	<meta name="description" content="Familia Baby Names" />
</svelte:head>
{#if !parentState.checked}
	Loading User...
{:else if !parentState.parent}
	<ParentForm onChange={onParentChange} />
{:else}
	<ListView />
{/if}
