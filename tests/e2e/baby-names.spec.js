import { test, expect } from '@playwright/test';

test.describe('Baby Names App E2E Tests', () => {
	const testName = 'Emma';
	const testRating = 4;

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Wait for the app to fully load
		await page.waitForLoadState('networkidle');
	});

	test('complete baby names workflow', async ({ page }) => {
		// Step 1: Add name
		await test.step('Add name', async () => {
			await page.fill('[data-testid="name-input"]', testName);
			await page.click('[data-testid="add-name-button"]');

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
			await page.click(`[data-testid="delete-button-${testName}"]`);

			// Wait for confirmation dialog
			const dialog = page.locator('[data-testid="delete-confirmation-dialog"]');
			await expect(dialog).toBeVisible();

			// Confirm deletion
			await page.click('[data-testid="confirm-delete-button"]');

			// Wait for dialog to close and deletion to process
			await expect(dialog).not.toBeVisible();
			await page.waitForTimeout(1000);
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

	test('should handle multiple names', async ({ page }) => {
		const names = ['Oliver', 'Charlotte', 'Liam'];

		// Add multiple names
		for (const name of names) {
			await page.fill('[data-testid="name-input"]', name);
			await page.click('[data-testid="add-name-button"]');
			await page.waitForSelector(`[data-testid="name-item-${name}"]`);
		}

		// Verify all names are displayed
		for (const name of names) {
			const nameItem = page.locator(`[data-testid="name-item-${name}"]`);
			await expect(nameItem).toBeVisible();
		}
	});

	test('should persist data after page reload', async ({ page }) => {
		// Add a name
		await page.fill('[data-testid="name-input"]', testName);
		await page.click('[data-testid="add-name-button"]');
		await page.waitForSelector(`[data-testid="name-item-${testName}"]`);

		// Rate the name
		await page.fill(`[data-testid="rating-input-${testName}"]`, testRating.toString());
		await page.click(`[data-testid="submit-rating-${testName}"]`);
		await page.waitForTimeout(1000);

		// Reload the page
		await page.reload();
		await page.waitForLoadState('networkidle');

		// Verify data persists
		const nameItem = page.locator(`[data-testid="name-item-${testName}"]`);
		await expect(nameItem).toBeVisible();

		const ratingDisplay = page.locator(`[data-testid="rating-display-${testName}"]`);
		await expect(ratingDisplay).toContainText(testRating.toString());
	});
});
