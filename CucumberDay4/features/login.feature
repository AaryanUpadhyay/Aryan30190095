Feature: Login Feature

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    And clicks the login button
    Then the user should be redirected to the homepage

  Scenario: Unsuccessful login with invalid credentials
    Given the user is on the login page
    When the user enters invalid credentials
    And clicks the login button
    Then an error message should be displayed

    Scenario Outline: Verify login with multiple sets of credentials
      Given the user is on the login page
      When the user enters "<username>" and "<password>"
      And clicks the login button
      Then the user should see "<result>"

      Examples:
        | username | password | result                  |
        | standard_user| secret_sauce| redirected to homepage  |
        | weird_user| secret_sauce| error message displayed |
        | locked_out_user| secret_sauce| error message displayed |
        | problem_user| secret_sauce| redirected to homepage  |
        | performance_glitch_user| secret_sauce| redirected to homepage  |
        | visual_user| secret_sauce| redirected to homepage  |