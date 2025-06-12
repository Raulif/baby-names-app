<script lang="ts">
	import clsx from 'clsx';

	type Props = {
		value?: number;
		debug?: boolean;
		onChangeHandler: () => void;
		changed?: boolean;
		loading?: boolean;
	};

	const { value, changed, onChangeHandler, loading }: Props = $props();
	const currentValue = $state({ value });

	const onInputChanged = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const input = e.target as HTMLInputElement;
		currentValue.value = parseInt(input.value) as number;
		onChangeHandler && onChangeHandler();
	};
</script>

<div class="flex items-center justify-between gap-4">
	<input type="range" name="rate" min="0" max="100" step="10" {value} onchange={onInputChanged} />
	{#if loading}
		<div class="flex h-6 min-w-6 items-center justify-center">
			<i class="fa fa-spinner animate-spin text-sm text-[blueviolet]"></i>
		</div>
	{:else}
		<button
			disabled={!changed}
			type="submit"
			aria-label="Bewertung speichern"
			class={clsx(
				'flex h-6 min-w-6 items-center justify-center rounded-sm border-[0] bg-[blueviolet]',
				!changed && 'pointer-events-none opacity-0'
			)}
		>
			<i class="fa fa-check text-[10px] text-white"></i>
		</button>
	{/if}
</div>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: 100%;
	}

	/***** Track Styles *****/
	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type='range']::-webkit-slider-runnable-track {
		background: linear-gradient(to right, red, yellow, green);
		height: 10px;
		border-radius: 10px;
	}

	/******** Firefox ********/
	input[type='range']::-moz-range-track {
		background: linear-gradient(to right, red, yellow, green);
		height: 10px;
		border-radius: 10px;
	}

	/***** Thumb Styles *****/
	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		background-color: blueviolet;
		height: 18px;
		width: 10px;
		margin-top: -4px;
		border-radius: 10px;
	}

	/***** Firefox *****/
	input[type='range']::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/
		background-color: blueviolet;
		height: 18px;
		width: 10px;
		border-radius: 10px;
	}

	/***** Focus Styles *****/
	/* Removes default focus */
	input[type='range']:focus {
		outline: none;
	}

	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type='range']:focus::-webkit-slider-thumb {
		border: 1px solid #053a5f;
		outline: 3px solid #053a5f;
		outline-offset: 0.125rem;
	}

	/******** Firefox ********/
	input[type='range']:focus::-moz-range-thumb {
		border: 1px solid #053a5f;
		outline: 3px solid #053a5f;
		outline-offset: 0.125rem;
	}
</style>
