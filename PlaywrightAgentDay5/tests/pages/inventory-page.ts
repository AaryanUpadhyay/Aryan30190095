import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly addBackpackButton: Locator;
  readonly backToProducts: Locator;
  private readonly cartLink: Locator;
  private readonly sortControl: Locator;
  private readonly backpackLink: Locator;
  private readonly removeBackpackButton: Locator;
  private readonly addBikeLightButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.backToProducts = page.locator('[data-test="back-to-products"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortControl = page.locator('[data-test="product-sort-container"]');
    this.backpackLink = page.locator('[data-test="item-4-title-link"]');
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.addBikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

  async sort(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortControl.selectOption(value);
  }

  async productNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async productPrices(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-price"]').allTextContents();
  }

  async openBackpackDetails(): Promise<void> {
    await this.backpackLink.click();
  }

  async returnToProducts(): Promise<void> {
    await this.backToProducts.click();
  }

  async addBackpack(): Promise<void> {
    await this.addBackpackButton.click();
  }

  async removeBackpack(): Promise<void> {
    await this.removeBackpackButton.click();
  }

  async addBikeLight(): Promise<void> {
    await this.addBikeLightButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
