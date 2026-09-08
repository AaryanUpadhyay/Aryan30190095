import { Locator, Page } from '@playwright/test';

export class MenuComponent {
  private readonly openMenuButton: Locator;
  private readonly resetAppStateLink: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async resetAppState(): Promise<void> {
    await this.openMenuButton.click();
    await this.resetAppStateLink.click();
  }

  async logout(): Promise<void> {
    await this.openMenuButton.click();
    await this.logoutLink.click();
  }
}
