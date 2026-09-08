import { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly checkoutButton: Locator;
  private readonly removeBackpackButton: Locator;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  itemNamed(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  async removeBackpack(): Promise<void> {
    await this.removeBackpackButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
