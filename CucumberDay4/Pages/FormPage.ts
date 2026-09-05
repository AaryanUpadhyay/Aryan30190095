import { expect, Locator, Page } from "@playwright/test";
 
 
export  class FormPage{
    Name: Locator;
    Email: Locator;
    Gender: Locator;
    Mobile: Locator;
    DOB: Locator;
    Subject: Locator;
    Hobbies: Locator;
    Picture: Locator;
    Address: Locator;
    State: Locator;
    City: Locator;
    SubmitBtn: Locator;

    constructor (private page: Page){
        this.Name = this.page.locator('#name');
        this.Email = this.page.locator('#email');
        this.Gender = this.page.locator('#gender');
        this.Mobile = this.page.locator('#mobile');
        this.DOB = this.page.locator('#dob');
        this.Subject = this.page.locator('#subjects');
        this.Hobbies = this.page.locator('#hobbies');
        this.Picture = this.page.getByLabel('Picture:');
        this.Address =  this.page.locator('textarea:visible')
        this.State = this.page.locator('#state');
        this.City = this.page.locator('#city');
        this.SubmitBtn = this.page.locator('input.btn.btn-primary');
    }
 
    async openApp(){
        await this.page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    }
 
    async enterDetails(name:string,email:string,gender:string,mobile:string,dob:string,subject:string,hobbies:string,picture:string,address:string,state:string,city:string){
        await this.Name.fill(name);
        await this.Email.fill(email);
        await this.Gender.click();
        await this.Mobile.fill(mobile);
        await this.DOB.fill(dob);
        await this.Subject.fill(subject);
        await this.Hobbies.check();
        await this.Picture.setInputFiles(picture);
        await this.Address.fill(address);
        await this.State.selectOption(state);
        await this.City.selectOption(city);
    }

    async verifySubmitEnabled(){
        await expect(this.SubmitBtn).toBeEnabled();
    }

    // async submit(){
    //     await this.SubmitBtn.click();
    // }

}