import { expect, Page } from '@playwright/test';

export class LoginPage {

constructor(
private page: Page
) {}


// locators 

private txtUser = '#user-name';

private txtPass = '#password';

private btnLogin ='#login-button';

async openApp() {

await this.page.goto(

'https://www.saucedemo.com/');

}

async login() {

console.log(
'Entering credentials');

// Example
await this.page.fill('input[name="user-name"]','standard_user');
await this.page.fill("//input[@id='password']",'secret_sauce');

}

async click(){
    console.log('Clicking button');
    await this.page.click('input[name="login-button"]');
}

async loginwithInvalidCredenials() {

console.log(
'Entering Invalid credentials');

// Example
await this.page.fill('input[name="user-name"]','standard_er');
await this.page.fill("//input[@id='password']",'secret_sace');
await this.page.click('input[name="login-button"]');
await expect(this.page.locator('[data-test="error"]')).toBeVisible();

}

async loginWithMultipleUser(username: string, password: string) {
    console.log(`Entering credentials for user: ${username}`);
    await this.page.fill(this.txtUser, username);
    await this.page.fill(this.txtPass, password);
}

async verifyResult(result: string) {
    if (result.includes('redirected to homepage')) {
        await expect(this.page.locator('.inventory_list')).toBeVisible();
    } else {
        await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    }
}


}

