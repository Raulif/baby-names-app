<input type="range" name="rate" min="0" max="100" step="10" />

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
		height: 0.5rem;
	}

	/******** Firefox ********/
	input[type='range']::-moz-range-track {
		background: linear-gradient(to right, red, yellow, green);
		height: 0.5rem;
	}

	/***** Thumb Styles *****/
	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		background-color: black;
		height: 1rem;
		width: 1rem;
		border-radius: 50%;
		margin-top: -4px;
	}

	/***** Firefox *****/
	input[type='range']::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/
		background-color: black;
		height: 1rem;
		width: 1rem;
		border-radius: 50%;
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
