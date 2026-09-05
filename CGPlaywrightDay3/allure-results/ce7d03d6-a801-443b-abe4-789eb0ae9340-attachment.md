# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: E2E.spec.ts >> E2E testing for the banking application
- Location: tests\E2E.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "process.env.BASE_URL!/sandbox/banking" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e5]:
  - generic [ref=e6]:
    - img "Apex Secure Banking" [ref=e7]
    - heading "State-of-the-Art NetBanking" [level=1] [ref=e8]
    - paragraph [ref=e9]: Access your accounts, cards, and loans securely. Protect your transactions with country-level standard Multi-Factor Authentication.
  - generic [ref=e11]:
    - generic [ref=e12]: APEX BANK
    - heading "Login to NetBanking" [level=2] [ref=e16]
    - generic [ref=e17]: Invalid username or password
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: Customer ID / Username
        - textbox "Enter username" [ref=e21]: aryupadh
      - generic [ref=e22]:
        - generic [ref=e23]: Password
        - textbox "Enter password" [ref=e24]: Password123!
      - generic [ref=e25]:
        - generic [ref=e26] [cursor=pointer]:
          - checkbox "Remember Customer ID" [ref=e27]
          - text: Remember Customer ID
        - button "Forgot PIN / Password?" [ref=e28] [cursor=pointer]
      - button "LOGIN" [active] [ref=e29] [cursor=pointer]
    - generic [ref=e30]:
      - paragraph [ref=e31]: Demo Credentials
      - paragraph [ref=e32]:
        - text: "Standard:"
        - strong [ref=e33]: apex_user
        - text: /
        - strong [ref=e34]: Password123!
      - paragraph [ref=e35]:
        - text: "2FA Secured:"
        - strong [ref=e36]: apex_2fa
        - text: /
        - strong [ref=e37]: Password2FA!
```

# Test source

```ts
  1  | import {Page, Locator, expect} from "@playwright/test";
  2  | 
  3  | 
  4  | export default class LoginPage{
  5  |     readonly page : Page;
  6  |     Username : Locator;
  7  |     Password : Locator;
  8  |     Submit : Locator;
  9  |     constructor(page: Page){
  10 |         this.page = page;
  11 |         this.Username = page.getByRole('textbox', {name: 'Enter username'});
  12 |         this.Password = page.getByRole('textbox', {name: 'Enter password'});
  13 |         this.Submit = page.getByRole('button', { name: 'LOGIN' });
  14 |     }
  15 |     async Login(){
  16 |         await this.Username.fill(process.env.USERNAME!);
  17 |         await this.Password.fill(process.env.PASSWORD!);
  18 |         await this.Submit.click();
> 19 |         await this.page.waitForURL('process.env.BASE_URL!/sandbox/banking');
     |                         ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  20 |     }
  21 | }
```