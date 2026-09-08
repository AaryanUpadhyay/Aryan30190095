import { Locator, Page } from '@playwright/test';
import type { Credential } from '../support/test-data';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(credential: Credential): Promise<void> {
    await this.username.fill(credential.Username);
    await this.password.fill(credential.Password);
    await this.loginButton.click();
  }
}
