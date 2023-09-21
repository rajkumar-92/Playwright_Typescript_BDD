
Feature: Playwright with Typescript scenarios for filght only End to End basic flows scenarios
  As a Western Region Customer
  I want to be able to do booking

  Scenario: Verifying each page and complete the booking
    Given a customer is on the TUI fly homepage
    And they select to view content in English on the site
    And a customer selects data from search fields
    And a customer made an outbound flight selection and return flight selection
    When customer clicks on CONTINUE button on Search Results Page will be taken to the Flight Options page
    # Then they click on continue button in flight page
    # And they click on continue button from extras page
    # And they click on continue button in passenger details page
    #And they select any of the payment method and click on continue
   # And booking reference number should be displayed

 
