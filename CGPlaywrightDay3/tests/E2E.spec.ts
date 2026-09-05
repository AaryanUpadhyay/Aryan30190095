import { test } from "@playwright/test";
import AccountSummaryPage from '../POM/accountSummary.page'
import FundTransferPage  from "../POM/Fundtransfer.page";
import LoginPage from "../POM/Login.page";

test("E2E testing for the banking application", async({page})=>{
    const Login = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
    await Login.Login();
    const account = new AccountSummaryPage(page);
    const Funds = new FundTransferPage(page);
    await account.verifyAccountSummaryPage();
    const beforeChecking = Number(await account.verifyCheckingAccountBalance());
    const beforeSaving = Number(await account.verifySavingsAccountBalance());
    // console.log(`Balance of Checking before transfer: ${beforeChecking}`);
    // console.log(`Balance of Saving before transfer: ${beforeSaving}`);
    await Funds.verifyFundTransferPage();
    await Funds.addNewBenificiary();
    await Funds.transferFunds();
    await account.verifyAccountSummaryPage();
    await account.verifyTransactions();
    const afterChecking = Number(await account.verifyCheckingAccountBalance());
    const afterSaving = Number(await account.verifySavingsAccountBalance());
    // console.log(`Balance of Checking after transfer: ${afterChecking}`);
    // console.log(`Balance of Saving after transfer: ${afterSaving}`);
    const diffChecking = beforeChecking - afterChecking;
    const diffSaving = beforeSaving - afterSaving;
    console.log(`Difference in balance of checking = ${beforeChecking} - ${afterChecking} = ${diffChecking}`)
    console.log(`Difference in balance of checking = ${beforeSaving} - ${beforeSaving} = ${diffSaving}`)

})