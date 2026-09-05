Feature: Form Feature

  Scenario Outline:Verify the login button enabled with the multiple datasets
    Given the user is on the form page
    When the user fills the form with "<Name>", "<Email>", "<Gender>", "<Mobile>", "<DOB>", "<Subject>", "<Hobbies>", "<Picture>", "<Address>", "<State>" and "<City>"
    Then the user should see the login button is enabled

      Examples:
        | Name | Email | Gender | Mobile | DOB | Subject | Hobbies | Picture | Address | State | City |
        | John Doe | john@example.com | Male | 1234567890 | 1990-01-01 | Math | Reading | ./Jhon.txt | 123 Street | Haryana | Lucknow |
        | Jane Smith | jane@example.com | Female | 0987654321 | 1992-02-02 | Science | Sports | ./Jhon.txt | 456 Avenue | Uttar Pradesh | Agra |
        | Alice Johnson | alice@example.com | Female | 1122334455 | 1993-03-03 | English | Music | ./Jhon.txt | 789 Boulevard | NCR | Agra |
        | Bob Brown | bob@example.com | Male | 6677889900 | 1994-04-04 | History | Reading | ./Jhon.txt | 1010 Lane | Rajasthan | Meerut |
        
    
