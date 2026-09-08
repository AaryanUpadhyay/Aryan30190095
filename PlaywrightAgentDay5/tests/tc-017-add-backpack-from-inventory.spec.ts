import { expect, test } from '@playwright/test';

test.describe('Inventory, Sorting, and Product Details', () => {
  test('TC-017 Add Sauce Labs Backpack from inventory', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('div.app_logo')).toHaveText('Swag Labs');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
