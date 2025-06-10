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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
		rel="stylesheet"
	/>
	<script src="https://kit.fontawesome.com/f6d01d0f1a.js" crossorigin="anonymous"></script>
</svelte:head>
{#if !parentState.checked}
	Loading User...
{:else if !parentState.parent}
	<ParentForm onChange={onParentChange} />
{:else}
	<NamesList />
	<NewNameForm />
{/if}
