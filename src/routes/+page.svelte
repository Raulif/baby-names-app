<script lang="ts">
	import { userState } from '$lib/userState.svelte';
	import { persistNamesToIndexedDB } from '$lib/idb-names';
	import ParentSelectView from '../views/ParentSelectView.svelte';
	import MainView from '../views/MainView.svelte';
	import ToastManager from '../components/ToastManager/ToastManager.svelte';

	const onSetup = (myName: string, partnerName: string) => {
		userState.userName = myName;
		userState.partnerName = partnerName;
		localStorage.setItem('userName', myName);
		localStorage.setItem('partnerName', partnerName);
		persistNamesToIndexedDB(myName, partnerName);
	};
</script>

<svelte:head>
	<title>Familia Baby Names</title>
	<meta name="description" content="Familia Baby Names" />
</svelte:head>
{#if !userState.checked}
	Loading User...
{:else if !userState.userName || !userState.partnerName}
	<ParentSelectView onChange={onSetup} />
{:else}
	<ToastManager />
	<MainView />
{/if}
