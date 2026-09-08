import { expect, test } from '@playwright/test';

test.describe('Cart and Checkout', () => {
  test('TC-062 Complete a standard-user purchase', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('div.app_logo')).toHaveText('Swag Labs');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});
