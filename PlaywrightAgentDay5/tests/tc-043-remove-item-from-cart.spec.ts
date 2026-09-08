import { expect, test } from '@playwright/test';

test.describe('Cart and Checkout', () => {
  test('TC-043 Remove one item from cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('div.app_logo')).toHaveText('Swag Labs');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveCount(0);
    await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
