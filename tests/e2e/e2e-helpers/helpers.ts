import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const addName = async (testName: string, page: Page) => {
	const newNameTab = page.getByTestId('new-name-tab-label');

	await expect(newNameTab).toBeVisible();
	await newNameTab.click();
	await expect(await page.getByTestId('name-input')).toBeVisible();
	await page.fill('[data-testid="name-input"]', testName);
	const genderButton = page.locator('form label.male').first();

	await genderButton.click();

	return await page.click('[data-testid="add-name-button"]');
};

// Delete test name in case it already exists on database
export const deleteName = async (testName: string, page: Page, unfoldItem?: boolean) => {
	if (unfoldItem) {
		const nameItem = page.locator(`[data-testid="name-item-${testName}"]`);
		// Show actions
		await nameItem.click();
	}

	await page.click(`[data-testid="delete-button-${testName}"]`);

	// Wait for confirmation dialog
	const dialog = page.locator(`dialog[data-testid="delete-dialog-${testName}"]`).first();
	await expect(dialog).toBeVisible();

	// Confirm deletion
	await page.click(`[data-testid="confirm-delete-button-${testName}"]`);

	// Wait for dialog to close and deletion to process
	await page.waitForTimeout(3000);
	return await expect(dialog).not.toBeVisible();
};
