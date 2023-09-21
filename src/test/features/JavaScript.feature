
Feature: Playwright with javascript scenarios for filght only End to End basic flows scenarios
  As a Western Region Customer
  I want to be able to do booking

  Scenario: Should able to make booking by Baggage Upgrade on flight page
    Given that a customer or agent is on the WR FO Flight Options page
    And they select the luggage other than Okg
    And Selected luggage should be displayed with the text
    And Other luggage price also should be updated
    When they click on continue button in flight page
    Then they click on continue button from extras page
    And they click on continue button in passenger details page
    #And they select any of the payment method and click on continue
    #And booking reference number should be displayed


