
const TUIInputData=require('../Utility/testData.json')

class TUISearchPage {

    constructor(page) {
        this.page = page;

        this.userName = page.locator('#userNameInput');
        this.passWord = page.locator('#passwordInput');
        this.clickBtn = page.locator("#submitButton");
        this.webPopUp = page.locator('#Ebene_1');
        this.clickOnPop = page.locator('[class="cmButtons"] #cmCloseBanner');
        this.LanguageLink = page.locator('div[class="cl-selector"] span[class*="cl-selector__lang"]');
        this.Dropdown = page.locator("select[name='langCode']");
        this.LngsubmitBtn = page.locator('button[type="submit"]');
        this.departPort = page.locator('tui-flight-search-bar #searchField-airport-outbound')
        this.destinationPort = page.locator('tui-flight-search-bar #searchField-airport-inbound')
        this.calendarOBTB = page.locator('tui-flight-search-bar #searchField-date-outbound')
        this.calendarOBMY = page.locator('tui-flight-search-bar #selectBox')
        this.calendarRTB = page.locator('tui-flight-search-bar #searchField-date-inbound')
        this.clickOnTravelers = page.locator('tui-flight-search-bar #searchField-pax');
        this.adultsDD = page.locator('tui-flight-search-bar #travelPartySelectAdults');
        this.childDD = page.locator('tui-flight-search-bar #travelPartySelectChildren');
        this.SearchBtn = page.locator('tui-flight-search-bar #searchButton');
    }

    async EnterUserName(text) {
        await this.userName.type(text)
    }

    async EnterPwd(text) {
        await this.passWord.type(text);
    }

    async click_LoginBtn() {
        await this.clickBtn.click();
    }
    async goto() {
        await this.page.goto('https://www.tuifly.be/flight/');
      }
    async accept() {
        var length = await this.webPopUp.count();
        if (length > 0) {
            await this.clickOnPop.click();
        }
    }

    async selectPrefLanguage() {
        await this.LanguageLink.click();
        await this.Dropdown.selectOption({ label: 'English' })
        await this.LngsubmitBtn.click();
    }

 
async NavigateToFlightSearchResultsPage(){
await this.ClickOn_departPort();
await this.selectDepartPort(TUIInputData.departPort);
await this.ClickOn_destinationPort();
await this.selectDestinationtPort(TUIInputData.arrivalPort);
await this.selectFromDate(TUIInputData.departDate[0], TUIInputData.departDate[1]);
await this.selectToDate(TUIInputData.arrivalDate[0], TUIInputData.arrivalDate[1]);
await this.selectPassengers(TUIInputData.adults, TUIInputData.children);
await this.selectchildAge(TUIInputData.adults, TUIInputData.childAge, TUIInputData.children);
await this.clickOnSearchBtn();

}

    async ClickOn_departPort() {
        await this.departPort.click();
        //AllureReporter.addStep(`Clicking on Choose airport`);
    }

    async selectDepartPort(Country) {
        const element = await this.page.locator(`tui-flight-search-bar #${Country}`)
        await element.click();
        //AllureReporter.addStep(`Selecting departure airport: ${Country}`);
    }

    //Choose Arrival Airport
    async ClickOn_destinationPort() {
        await this.destinationPort.click();
        // AllureReporter.addStep(`Clicking on Choose a destination`);
    }

    async selectDestinationtPort(Country) {
       // const ele = this.page.locator('tui-flight-search-bar ul[class="list__19a00"]:nth-child(1)>li>a[id="' + Country + '"]');
       const ele = this.page.locator('tui-flight-search-bar #searchField-airport-inbound-wrapper')
      const locator=await ele.locator('[id="' + Country + '"]'); 
       await locator.click();
        //  AllureReporter.addStep(`Selecting destination airport: ${Country}`);
    }

/*     //Select departure and arrival dates
    async selectDate(date, month, year) {
        await (await this.selectDate).setValue(date);
        await (await this.selectMonth).setValue(month);
        await this.selectYear.setValue(year);
    } */

    async selectFromDate(value, date) {
        await this.calendarOBTB.click();
        await this.calendarOBMY.selectOption(`${value}`)
        var locator = await this.page.$('tui-flight-search-bar #calendarItems-outbound');
        var elements = await locator.$$('div[class*="entry"]');

        for (var i = 0; i < elements.length; i++) {
            var actualDate = await elements[i].textContent();
            if (actualDate === date) {
                var attribute = await elements[i].getAttribute('class');
                // await expect(attribute).to.contain("available");
                if (attribute.includes('available')) {
                    await elements[i].click();
                    break;
                }
                else {
                    for (++i; i < elements.length; i++) {
                        attribute = await elements[i].getAttribute('class');
                        if (attribute.includes('available')) {
                            await elements[i].click();
                            break;
                        }
                    }
                    break;
                }
            }
        }
        // AllureReporter.addStep(`Selecting From date`)
    }

    async selectToDate(value, date) {
        await this.calendarRTB.click();
        var calendarrMY = await this.calendarOBMY.nth(1);
        await calendarrMY.selectOption(`${value}`)
        var locator = await this.page.$('tui-flight-search-bar #calendarItems-inbound')
        var elements = await locator.$$('div[class*="entry"]')
        for (var i = 0; i < elements.length; i++) {
            var actualDate = await elements[i].textContent();
            if (actualDate === date) {
                var attribute = await elements[i].getAttribute('class');
                if (attribute.includes('available')) {
                    await elements[i].click();
                    break;
                }
                else {
                    for (++i; i < elements.length; i++) {
                        attribute = await elements[i].getAttribute('class');
                        if (attribute.includes('available')) {
                            await elements[i].click();
                            break;
                        }
                    }
                    break;
                }
            }
        }
        // AllureReporter.addStep(`Selecting ToDate`)
    }

    //Selecting number of Passengers
    async selectPassengers(adults, children) {
        await this.clickOnTravelers.click();
        await this.adultsDD.selectOption(`${adults}`)
        await this.childDD.selectOption(`${children}`)
        // AllureReporter.addStep("Selecting the passengers")
    }

    async selectchildAge(Adults, Ages, Noofchildren) {
        var infantCount = 0;
        for (var i = 0; i < Noofchildren; i++) {
            let locator = await this.page.locator('tui-flight-search-bar #childAgeSelectionSection div[class*="group"] select[name="' + i + '"]')
            await locator.selectOption(`${Ages[i]}`)
            if (Ages[i] <= 1) {
                infantCount++;
            }

            if (infantCount > Adults) {
                //  let errorMsg = await $('tui-flight-search-bar').shadow$('#errorMsgPaxPanel div[class*="text"]');
                let errorMsg = await this.page.locator('tui-flight-search-bar #errorMsgPaxPanel div[class*="text"]')
                //await expect(errorMsg).isVisible();
                await expect(errorMsg).toHaveCount(0)

            }
        }
        //AllureReporter.addStep("Selecting the children ages")
    }

    async clickOnSearchBtn() {
        await this.SearchBtn.click();
        // AllureReporter.addStep(`Clicking on search button`);
    }
}
module.exports={TUISearchPage}
