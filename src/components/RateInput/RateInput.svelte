<script lang="ts">
	type Props = {
		value?: number;
		debug?: boolean;
		name: string;
		rateChanged: boolean;
	};

	let { value, name, rateChanged = $bindable() }: Props = $props();
	let currentValue = $state(value);

	const onInputChanged = (
		e: Event & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		const input = e.target as HTMLInputElement;
		currentValue = parseInt(input.value) as number;
		rateChanged = true;
	};
</script>

<input
	data-testid={`rating-input-${name}`}
	type="range"
	name="rate"
	min="0"
	max="100"
	step="10"
	value={currentValue}
	onchange={onInputChanged}
/>

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
		height: 8px;
		border-radius: 10px;
	}

	/******** Firefox ********/
	input[type='range']::-moz-range-track {
		height: 8px;
		border-radius: 10px;
	}

	/***** Thumb Styles *****/
	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		height: 14px;
		width: 10px;
		margin-top: -3px;
		border-radius: 10px;
	}

	/***** Firefox *****/
	input[type='range']::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/
		height: 14px;
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
