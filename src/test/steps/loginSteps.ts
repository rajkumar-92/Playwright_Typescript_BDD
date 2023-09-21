import { Given, When, Then,setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture"

import { TUISearchPage1 } from "./PageObjects/TUISearchPage1"
import { TUISearchResultPage2 } from "./PageObjects/TUISearchResultPage2"
import { TUIFlightOptionsPage3 } from "./PageObjects/TUIFlightOptionsPage3"
import { TUIExtraOptionsPage4 } from "./PageObjects/TUIExtraOptionsPage4"
import { TUIPassengerDetailsPage5 } from "./PageObjects/TUIPassengerDetailsPage5"
import TUIInputData from "../steps/Utility/testData.json"


setDefaultTimeout(60*1000*2)
Given('a customer is on the TUI fly homepage', async function () {
 const TUISearchpage=new TUISearchPage1(pageFixture.page)
   await TUISearchpage.goto()
   await TUISearchpage.accept();
  
});

Given('they select to view content in English on the site', async function () {
   const TUISearchpage=new TUISearchPage1(pageFixture.page)
  await TUISearchpage.selectPrefLanguage();
});

Given('a customer selects data from search fields', async function () {
  const TUISearchpage = new TUISearchPage1(pageFixture.page)
  await TUISearchpage.ClickOn_departPort();
  await TUISearchpage.selectDepartPort(TUIInputData.departPort);
  await TUISearchpage.ClickOn_destinationPort();
  await TUISearchpage.selectDestinationtPort(TUIInputData.arrivalPort);
  await TUISearchpage.selectFromDate(TUIInputData.departDate[0], TUIInputData.departDate[1]);
  await TUISearchpage.selectToDate(TUIInputData.arrivalDate[0], TUIInputData.arrivalDate[1]);
  await TUISearchpage.selectPassengers(TUIInputData.adults, TUIInputData.children);
  await TUISearchpage.selectchildAge(TUIInputData.adults, TUIInputData.childAge, TUIInputData.children);
  await TUISearchpage.clickOnSearchBtn();
});

Given('a customer made an outbound flight selection and return flight selection', async function () {
  const TUISearchResultpage = new TUISearchResultPage2(pageFixture.page)
    await TUISearchResultpage.OutBound_ListOfFlights();
    await TUISearchResultpage.selectCheapestOutboundFlight();
    await TUISearchResultpage.Return_ListOfFlights();
    await TUISearchResultpage.selectCheapestReturnFlight();
   
});

When('customer clicks on CONTINUE button on Search Results Page will be taken to the Flight Options page', async function () {
  const TUISearchResultpage = new TUISearchResultPage2(pageFixture.page)
  await TUISearchResultpage.clickContinueButton();
});
/*
Then('they click on continue button in flight page', async function () {
  const TUIFlightOptionspage = new TUIFlightOptionsPage3(pageFixture.page)
  await TUIFlightOptionspage.clickContinueButtonOnSeatBaggage();

});

Then('they click on continue button from extras page', async function () {
  const TUIExtraOptionspage = new TUIExtraOptionsPage4(pageFixture.page)
  await TUIExtraOptionspage.clickContinueButtonOnInsurance();
});

Then('they click on continue button in passenger details page', async function () {
  const TUIPassengerDetailspage = new TUIPassengerDetailsPage5(pageFixture.page)
await TUIPassengerDetailspage.clickContinueButtonOnPassengeDetails();
}); */

/* Then('they select any of the payment method and click on continue', async function () {

});

Then('booking reference number should be displayed', async function () {

}); */



