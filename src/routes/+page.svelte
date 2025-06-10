<script lang="ts">
	import NewNameForm from '../components/NewNameForm/NewNameForm.svelte';
	import NamesList from '../components/NamesList.svelte';
	import ParentForm from '../components/ParentForm.svelte';
	import { parentState } from '../lib/parent.svelte';

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
	<NamesList />
	<NewNameForm />
{/if}
