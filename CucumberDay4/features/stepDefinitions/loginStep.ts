import { Given , Then, When} from "@cucumber/cucumber";
import { LoginPage } from "../../Pages/LoginPage";
import { CustomWorld } from "../../support/world";

let login : LoginPage;

Given('the user is on the login page',async function (this:CustomWorld) {
  login = new LoginPage(this.page);
  await login.openApp();
});

When('the user enters valid credentials',async function (this:CustomWorld) {
  await login.login();
});

When('clicks the login button',async function (this:CustomWorld) {
  await login.click()
});

Then('the user should be redirected to the homepage',async function (this:CustomWorld) {
  console.log("Login Successfull")
});

When('the user enters invalid credentials',async function (this:CustomWorld) {
  await login.loginwithInvalidCredenials();
});

Then('an error message should be displayed', function () {
  console.log("Error Displayed");
});

When('the user enters {string} and {string}', async function (this: CustomWorld, username: string, password: string) {
  await login.loginWithMultipleUser(username, password);
});

Then('the user should see {string}', async function (this: CustomWorld, result: string) {
  await login.verifyResult(result);
});