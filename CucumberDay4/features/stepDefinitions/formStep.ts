import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { FormPage } from "../../Pages/FormPage";

let Form : FormPage;

Given('the user is on the form page', async function (this:CustomWorld) {
    Form = new FormPage(this.page);
    await Form.openApp();
});

When('the user fills the form with {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} and {string}', async function (this: CustomWorld, Name: string, Email: string, Gender: string, Mobile: string, DOB: string, Subject: string, Hobbies: string, Picture: string, Address: string, State: string, City: string) {
    await Form.enterDetails(Name, Email, Gender, Mobile, DOB, Subject, Hobbies, Picture, Address, State, City);
});

Then('the user should see the login button is enabled', async function (this: CustomWorld) {
    await Form.verifySubmitEnabled();
});