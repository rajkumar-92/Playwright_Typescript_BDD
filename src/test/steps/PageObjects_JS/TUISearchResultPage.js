
class TUISearchResultPage {
    constructor(page) {
        this.page = page;
        this.continueBtn = page.locator("//button[contains(@class,'continue')]");
    }

    async OutBound_ListOfFlights() {

        let availableDates = await this.page.$$("(//*[@class='carousel__carouselContainer'])[1]//div[@class='DataCarouselItem__dateCarouselItem']");
        let activeDate = await this.page.locator("(//*[@class='carousel__carouselContainer'])[1]//div[contains(@class,'activeTab')]").textContent();

        //Add active date and price to map
        let active_date = await (await activeDate).split('€')[0];
        // let active_price = await (await activeDate.textContent()).split('\n')[1].split('€')[1];
        let active_price = await (await activeDate).split('€')[1];
        var map = new Map();
        map.set(active_date, active_price);
        let availableDateArray = [];
        let availablePriceArray = [];
        for (var i = 0; i < availableDates.length; i++) {
            var dateandprice = await availableDates[i].textContent();
            availableDateArray[i] = await dateandprice.split('€')[0];
            availablePriceArray[i] = await dateandprice.split('€')[1];
            //Add active date and price to map
            map.set(availableDateArray[i], availablePriceArray[i]);
        }
        const sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1])); //sorting the map
        const sortedDatePriceArray = [...sortedMap]; //converting map to array
        //If the active date is not having cheapest price, pick the cheapest price from other available dates
        var cheapestpricedDate = sortedDatePriceArray[0][0]
        if (cheapestpricedDate != active_date) {
            for (i = 0; i < availableDateArray.length; i++) {
                if (availableDateArray[i] === cheapestpricedDate) {
                    await availableDates[i].click();
                    break;
                }
            }
        }
        //AllureReporter.addStep("Selecting Outbound flight from the available list")
    }

    async selectCheapestOutboundFlight() {

        var availableFlightsPrice = await this.page.$$("(//*[@class='FlightCardsList__flightCardsList'])[1]//*[@class='FlightInformation__priceInfo']");

        var price = [];
        for (var i = 0; i < availableFlightsPrice.length; i++) {
            price[i] = (await availableFlightsPrice[i].textContent()).split('€')[1];
        }
        var sortedPrice = price.sort(); //209.99,309.99
        var pricetext = sortedPrice[0].split('.')[0];

        var flightselectionButton = await this.page.$("(//div[@class='FlightCardsList__flightCardsList'])[1]//*[text()='" + pricetext + "']/../../../..//div[contains(@class,'selectionStatus')]//button");

        await flightselectionButton.click();
        //  AllureReporter.addStep("Selecting cheapest flight from the available Outbount Flight list")
    }

    async Return_ListOfFlights() {

        let availableDates = await this.page.$$("(//*[@class='carousel__carouselContainer'])[2]//div[@class='DataCarouselItem__dateCarouselItem']");
        let activeDate = await this.page.locator("(//*[@class='carousel__carouselContainer'])[2]//div[contains(@class,'activeTab')]").textContent();

        //Add active date and price to map
        let active_date = await (await activeDate).split('€')[0];
        let active_price = await (await activeDate).split('€')[1];
        var map = new Map();
        map.set(active_date, active_price);
        let availableDateArray = [];
        let availablePriceArray = [];
        for (var i = 0; i < availableDates.length; i++) {
            var dateandprice = await availableDates[i].textContent();
            availableDateArray[i] = await dateandprice.split('€')[0];
            availablePriceArray[i] = await dateandprice.split('€')[1];
            //Add active date and price to map
            map.set(availableDateArray[i], availablePriceArray[i]);
        }
        const sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1])); //sorting the map
        const sortedDatePriceArray = [...sortedMap]; //converting map to array
        //If the active date is not having cheapest price, pick the cheapest price from other available dates
        var cheapestpricedDate = sortedDatePriceArray[0][0]
        if (cheapestpricedDate != active_date) {
            for (i = 0; i < availableDateArray.length; i++) {
                if (availableDateArray[i] === cheapestpricedDate) {
                    await availableDates[i].click();
                    break;
                }
            }
        }
        // AllureReporter.addStep("Selecting Return flight from the available list")
    }

    async selectCheapestReturnFlight() {

        var availableFlightsPrice = await this.page.$$("(//*[@class='FlightCardsList__flightCardsList'])[2]//*[@class='FlightInformation__priceInfo']");

        var price = [];
        for (var i = 0; i < availableFlightsPrice.length; i++) {
            price[i] = (await availableFlightsPrice[i].textContent()).split('€')[1];
        }
        var sortedPrice = price.sort(); //309.99,369
        var pricetext = sortedPrice[0].split('.')[0];

        var flightselectionButton = await this.page.$("(//div[@class='FlightCardsList__flightCardsList'])[2]//*[text()='" + pricetext + "']/../../../..//div[contains(@class,'selectionStatus')]//button");

        await flightselectionButton.click();
        //AllureReporter.addStep("Selecting cheapest flight from the available Return Flight list")
        //    await this.page.pause(5000);
    }   

    async clickContinueButton() {
        var test = this.continueBtn;
        await test.click();

        // AllureReporter.addStep(`Clicking on continue button`);
    }
}
module.exports={TUISearchResultPage}
