import {Page, Locator, expect} from "@playwright/test";


export default class LoginPage{
    readonly page : Page;
    Username : Locator;
    Password : Locator;
    Submit : Locator;
    constructor(page: Page){
        this.page = page;
        this.Username = page.getByRole('textbox', {name: 'Enter username'});
        this.Password = page.getByRole('textbox', {name: 'Enter password'});
        this.Submit = page.getByRole('button', { name: 'LOGIN' });
    }
    async Login(){
        await this.Username.fill(process.env.UNAME!);
        await this.Password.fill(process.env.PASS!);
        await this.Submit.click();
            await this.page.waitForURL('**/sandbox/banking');
    }
}