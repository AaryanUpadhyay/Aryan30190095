import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly error: Locator;
  readonly completeHeader: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;

  constructor(private readonly page: Page) {
    this.error = page.locator('[data-test="error"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectTotalsToBalance(): Promise<void> {
    const toAmount = (text: string) => Number(text.match(/\d+\.\d{2}/)?.[0]);
    const itemTotal = toAmount(await this.itemTotal.textContent() ?? '');
    const tax = toAmount(await this.tax.textContent() ?? '');
    const total = toAmount(await this.total.textContent() ?? '');
    expect(itemTotal).toBeGreaterThan(0);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  }
}
