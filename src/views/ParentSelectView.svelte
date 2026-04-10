<script lang="ts">
	type Props = {
		onChange: (myName: string, partnerName: string) => void;
	};
	const { onChange }: Props = $props();

	let myName = $state('');
	let partnerName = $state('');
	let error = $state('');

	const onSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!myName.trim() || !partnerName.trim()) return;
		if (myName.trim() === partnerName.trim()) {
			error = 'Die Namen dürfen nicht gleich sein.';
			return;
		}
		onChange(myName.trim(), partnerName.trim());
	};
</script>

<section class="flex h-[100dvh] flex-col items-center justify-center gap-4">
	<form
		method="POST"
		onsubmit={onSubmit}
		class="flex w-full max-w-[80vw] flex-col gap-4"
	>
		<label for="my-name" class="open-sans-bold w-full text-left">
			Dein Name:
		</label>
		<input
			id="my-name"
			type="text"
			bind:value={myName}
			placeholder="Dein Name"
			required
			class="open-sans-regular w-full rounded-md border-1 border-[#b5b4a2] px-3 py-2 text-lg"
			data-testid="my-name-input"
		/>

		<label for="partner-name" class="open-sans-bold w-full text-left">
			Name deiner Partners:
		</label>
		<input
			id="partner-name"
			type="text"
			bind:value={partnerName}
			placeholder="Name deiner Partners"
			required
			class="open-sans-regular w-full rounded-md border-1 border-[#b5b4a2] px-3 py-2 text-lg"
			data-testid="partner-name-input"
		/>

		{#if error}
			<p class="open-sans-regular text-sm text-red-500">{error}</p>
		{/if}

		<input
			data-testid="parent-select-submit"
			type="submit"
			title="save"
			class="open-sans-bold w-full rounded-md bg-[#b5b4a2] py-2 text-xl text-[#eef6e9] disabled:bg-gray-400"
		/>
	</form>
</section>
