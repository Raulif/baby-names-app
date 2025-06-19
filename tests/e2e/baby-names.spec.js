import { test, expect } from '@playwright/test';
import { addName, deleteName } from './e2e-helpers/helpers';

test.describe('Baby Names App E2E Tests', () => {
	const testName = 'TestName';
	const testRating = 60;

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Wait for the app to fully load
		await page.waitForLoadState('networkidle');
		const parentSelect = await page.getByTestId('parent-select');
		await expect(parentSelect).toBeVisible();
		await parentSelect.selectOption('papa');
		await (await page.getByTestId('parent-select-submit')).click();

		await page.locator('.listitem-wrapper').first().waitFor();
		const namesList = page.locator(`[data-testid="names-list"]`);
		const textContent = await namesList.textContent();

		if (textContent?.includes(testName)) {
			await deleteName(testName, page, true);
		}
	});

	test('complete baby names workflow', async ({ page }) => {
		// Step 1: Add name
		await test.step('Add name', async () => {
			await page.locator('.listitem-wrapper').first().waitFor();

			await addName(testName, page);
			// Wait for the name to be added
			await page.waitForSelector(`[data-testid="name-item-${testName}"]`);
		});

		// Step 2: Check that name exists in list
		await test.step('Check that name exists in list', async () => {
			const nameItem = page.locator(`[data-testid="name-item-${testName}"]`);
			await expect(nameItem).toBeVisible();
			await expect(nameItem).toContainText(testName);
		});

		// Step 3: Rate name
		await test.step('Rate name', async () => {
			// Set the range input value
			await page.fill(`[data-testid="rating-input-${testName}"]`, testRating.toString());

			// Click the submit rating button
			await page.click(`[data-testid="submit-rating-${testName}"]`);

			// Wait for rating to be saved
			await page.waitForTimeout(1000);
		});

		// Step 4: Check that displayed rating has been changed
		await test.step('Check that displayed rating has been changed', async () => {
			const ratingDisplay = page.locator(`[data-testid="rating-display-${testName}"]`);
			await expect(ratingDisplay).toContainText(testRating.toString());
		});

		// Step 5: Veto name
		await test.step('Veto name', async () => {
			const nameItem = page.locator(`[data-testid="name-item-${testName}"]`);
			// Show actions
			await nameItem.click();
			await page.click(`[data-testid="veto-button-${testName}"]`);

			// Wait for veto to be processed
			await page.waitForTimeout(1000);
		});

		// Step 6: Check that veto is displayed
		await test.step('Check that veto is displayed', async () => {
			const nameItem = page.locator(`[data-testid="name-item-${testName}"]`);
			await expect(nameItem).toHaveClass(/vetoed/);

			// Or check for veto indicator
			const vetoIndicator = page.locator(`[data-testid="veto-indicator-${testName}"]`);
			await expect(vetoIndicator).toBeVisible();
		});

		// Step 7: Delete name (include interaction with dialogue)
		await test.step('Delete name with dialog interaction', async () => {
			await deleteName(testName, page);
		});

		// Step 8: Check that name has been deleted
		await test.step('Check that name has been deleted', async () => {
			const nameItem = page.locator(`[data-testid="name-item-${testName}"]`);
			await expect(nameItem).not.toBeVisible();

			// Verify name is not in the list anymore
			const namesList = page.locator('[data-testid="names-list"]');
			await expect(namesList).not.toContainText(testName);
		});
	});
});
