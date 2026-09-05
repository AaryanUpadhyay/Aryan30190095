import {chromium} from '@playwright/test';

async function globalSetup(){
    console.log('Global Setup started');
    const browser = await chromium.launch();
    let page = await browser.newPage();
    await page.goto('https://www.playwrightpad.in/sandbox/banking');
    await page.getByRole('textbox', {name: 'Enter username'}).fill('apex_user');
    await page.getByRole('textbox', {name: 'Enter password'}).fill('Password123!');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.waitForURL('**/sandbox/banking');

    //save authentication
    await page.context().storageState({
        path: 'auth.json'
    });

    await browser.close();
    console.log('Global Setup completed');
}
export default globalSetup;