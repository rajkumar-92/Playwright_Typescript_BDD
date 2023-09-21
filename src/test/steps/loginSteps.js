const TUIInputData=require('../steps/Utility/testData.json')

const {Given, When, Then} = require("@cucumber/cucumber")
const {expect} = require("@playwright/test");

Given('that a customer or agent is on the WR FO Flight Options page', async function () {

  this.TUISearchpage = this.poManager.getTUISearchPage();
  await this.TUISearchpage.goto();
   await this.TUISearchpage.accept();
   await this.TUISearchpage.selectPrefLanguage();
   await this.TUISearchpage.NavigateToFlightSearchResultsPage(); 
   this.TUISearchResultpage = this.poManager.getTUISearchResultPage();
    await this.TUISearchResultpage.OutBound_ListOfFlights();
    await this.TUISearchResultpage.selectCheapestOutboundFlight();
    await this.TUISearchResultpage.Return_ListOfFlights();
    await this.TUISearchResultpage.selectCheapestReturnFlight();
    await this.TUISearchResultpage.clickContinueButton(); 

});

Given('they select the luggage other than Okg', async function () {
  this.TUIFlightOptionspage=this.poManager.getTUIFlightOptionsPage();
  await this.page.waitForLoadState("networkidle");
  await this.TUIFlightOptionspage.selectOutBound_BaggageWeight(TUIInputData.OutboundBaggage)
  await this.TUIFlightOptionspage.clickonCheckBox();
  await this.TUIFlightOptionspage.selectReturn_BaggageWeight(TUIInputData.ReturnBaggage)
});

  Given('Selected luggage should be displayed with the text', async function () {
    this.TUIFlightOptionspage=this.poManager.getTUIFlightOptionsPage();
    let luggageSelection=await this.TUIFlightOptionspage.verifyingLuggageText()
    expect(await luggageSelection[0].textContent()).toEqual(`Outbound flight: hand luggage + 25kg check-in luggage`)
    expect(await luggageSelection[1].textContent()).toEqual(`Return flight: hand luggage + 25kg check-in luggage`)
    expect(await luggageSelection[2].textContent()).toEqual(`Outbound flight: hand luggage + 20kg check-in luggage`)
    expect(await luggageSelection[3].textContent()).toEqual(`Return flight: hand luggage + 25kg check-in luggage`)

});

Given('Other luggage price also should be updated', async function () {
  this.TUIFlightOptionspage=this.poManager.getTUIFlightOptionsPage();
  /* let luggagePrice=await this.TUIFlightOptionspage.selectReturn_BaggageWeight(TUIInputData.ReturnBaggage)
  console.log('luggagePrice:'+luggagePrice) */
  expect(await this.TUIFlightOptionspage.LuggagePrice()).toEqual(111)

});  

When('they click on continue button in flight page', async function () {
  this.TUIFlightOptionspage=this.poManager.getTUIFlightOptionsPage();
 
  await this.TUIFlightOptionspage.clickContinueButtonOnSeatBaggage();

});

Then('they click on continue button from extras page', async function () {
  this.TUIExtraOptionspage=this.poManager.getTUIExtraOptionsPage();
  await this.TUIExtraOptionspage.clickContinueButtonOnInsurance();


});

Then('they click on continue button in passenger details page', async function () {
  this.TUIPassengerDetailspage=this.poManager.getTUIPassengerDetailsPage();

  await this.TUIPassengerDetailspage.clickContinueButtonOnPassengeDetails();
});
/*
Then('they select any of the payment method and click on continue', async function () {

});

Then('booking reference number should be displayed', async function () {

});*/
