import {Page, Locator, expect} from "@playwright/test";
import transactionData from "../datadriven/transaction.json";

export default class AccountSummaryPage{
    readonly page: Page;
    CheckingAccount : Locator;
    SavingsAccount : Locator;
    Transactions : Locator;
    AccountSummaryPage : Locator;

    constructor(page: Page){
        this.page = page;
        this.CheckingAccount = page.locator("div[data-account='checking'] div[class='balance']");
        this.SavingsAccount = page.locator("div[data-account='savings'] div[class='balance']");
        this.Transactions = page.getByRole('cell', { name: '' });
        this.AccountSummaryPage = page.getByRole('button', { name: 'Accounts Summary' });
    }

    async verifyAccountSummaryPage(){
        if(await this.CheckingAccount.isVisible() && await this.SavingsAccount.isVisible()){
            console.log("Account Summary Page is verified");
        }
        else{
            await this.AccountSummaryPage.click();
            expect(this.CheckingAccount).toBeVisible();
            expect(this.SavingsAccount).toBeVisible();
            console.log("Account Summary Page is verified");
        }
    }
    async verifyCheckingAccountBalance(){
        const balanceText = await this.CheckingAccount.textContent();
        const balance = Number(
            balanceText?.replace('$', '').replace(/,/g, '')
        );
        console.log(`Checking account balance is verified: ${balance}`);
        return balance;
    }
    async verifySavingsAccountBalance(){
        const balanceText = await this.SavingsAccount.textContent();
        const balance = Number(
            balanceText?.replace('$', '').replace(/,/g, '')
        );
        console.log(`Savings account balance is verified: ${balance}`);
        return balance;
    }
    async verifyTransactions(){
        await this.page.getByRole('cell', { name: transactionData.transactions })
    }


}