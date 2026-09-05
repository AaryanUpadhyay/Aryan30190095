import {Locator, expect, Page} from "@playwright/test";
import beneficiaryData from "../datadriven/Beneficiary.json";
import fundTransferData from "../datadriven/fundtransfer.json";
export default class FundTransferPage{
    readonly page : Page;
    AddBenificiary : Locator;
    FullName: Locator;
    AccountNumber : Locator;
    RecipentBank : Locator;
    SaveButton : Locator;
    TransferType : Locator;
    SelectBeneficiary : Locator;
    Amount : Locator;
    TransferButton : Locator;
    OTP : Locator;
    VerifyBox : Locator;
    VerifyButton : Locator;
    FundTransferPage : Locator;

    constructor(page : Page){
        this.page = page;
        this.AddBenificiary = page.getByRole('button', { name: 'Add New' });
        this.FullName = page.getByPlaceholder('e.g. John Doe');
        this.AccountNumber = page.getByRole('textbox', { name: 'e.g. 1234567890' });
        this.RecipentBank = page.locator('#bene-bank');
        this.SaveButton = page.getByRole('button', { name: 'Save Beneficiary' });
        this.TransferType = page.locator('#transfer-type');
        this.SelectBeneficiary = page.locator('#bene-select');
        this.Amount = page.getByRole('spinbutton', { name: '0.00' });
        this.TransferButton = page.getByRole('button', { name: 'Initiate Wire' });
        this.OTP = page.locator('strong.otp-display-code:visible');
        this.VerifyBox = page.getByRole('textbox');
        this.VerifyButton = page.getByRole('button', { name: 'Verify' });
        this.FundTransferPage = page.getByRole('button', { name: 'Funds Transfer' });
    }

    async verifyFundTransferPage(){
        if(await this.AddBenificiary.isVisible()){
            console.log("Fund Transfer Page is verified");
        }
        else{
            await this.FundTransferPage.click();
            expect(this.AddBenificiary).toBeVisible();
            console.log("Fund Transfer Page is verified");
        }
    }

    async addNewBenificiary(){
        await this.AddBenificiary.click();
        await this.FullName.fill(beneficiaryData.FullName);
        await this.AccountNumber.fill(beneficiaryData.AccountNumber);
        await this.RecipentBank.selectOption(beneficiaryData.RecipentBank);
        await this.SaveButton.click();
        console.log("New Beneficiary is added");
        await expect(this.page.getByText(beneficiaryData.FullName)).toBeVisible();
    }

    async transferFunds(){
        await this.TransferType.selectOption(fundTransferData.type);
        await this.SelectBeneficiary.selectOption({index:2});
        await this.Amount.fill(fundTransferData.amount);
        await this.TransferButton.click();
        const otp = await this.OTP.innerText();
        console.log(`OTP is : ${otp}`);
        await this.VerifyBox.fill(otp);
        await this.VerifyButton.click();
        console.log("Fund Transfer is completed");
        await expect(this.page.getByText(`$${fundTransferData.amount}`)).toBeVisible();
    }
    
}
