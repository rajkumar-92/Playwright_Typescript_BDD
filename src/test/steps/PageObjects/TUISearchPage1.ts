//const { default: AllureReporter } = require("@wdio/allure-reporter");
//const Utility = require('../../Utilities/Utility');

import { expect, type Locator, type Page } from '@playwright/test';

export class TUISearchPage1 {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly clickBtn: Locator;
    readonly webPopUp: Locator;
    readonly clickOnPop: Locator;
    readonly LanguageLink: Locator;
    readonly Dropdown: Locator;
    readonly LngsubmitBtn: Locator;
    readonly departPort: Locator;
    readonly destinationPort: Locator;
    readonly calendarOBTB: Locator;
    readonly calendarOBMY: Locator;
    readonly calendarRTB: Locator;
    readonly clickOnTravelers: Locator;
    readonly adultsDD: Locator;
    readonly childDD: Locator;
    readonly SearchBtn: Locator;

    constructor(page: Page) {
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
    async goto() {
        await this.page.goto('https://www.tuifly.be/flight/');
      }

    async EnterUserName(text:string): Promise<void> {
        await this.userName.type(text)
    }

    async EnterPwd(text:string): Promise<void> {
        await this.passWord.type(text);
    }

    async click_LoginBtn(): Promise<void> {
        await this.clickBtn.click();
    }

    async accept(): Promise<void> {
        var length = await this.webPopUp.count();
        if (length > 0) {
            await this.clickOnPop.click();
        }
    }

    async selectPrefLanguage(): Promise<void> {
        await this.LanguageLink.click();
        await this.Dropdown.selectOption({ label: 'English' })
        await this.LngsubmitBtn.click();
    }
 

    async ClickOn_departPort(): Promise<void> {
        await this.departPort.click();
        //AllureReporter.addStep(`Clicking on Choose airport`);
    }

    async selectDepartPort(Country:string): Promise<void> {
        const element = await this.page.locator(`tui-flight-search-bar #${Country}`)
        await element.click();
        //AllureReporter.addStep(`Selecting departure airport: ${Country}`);
    }

    //Choose Arrival Airport
    async ClickOn_destinationPort(): Promise<void> {
        await this.destinationPort.click();
        // AllureReporter.addStep(`Clicking on Choose a destination`);
    }

    async selectDestinationtPort(Country:string): Promise<void> {
       // const ele = this.page.locator('tui-flight-search-bar ul[class="list__19a00"]:nth-child(1)>li>a[id="' + Country + '"]');
        //await ele.click();
        const ele = this.page.locator('tui-flight-search-bar #searchField-airport-inbound-wrapper')
      const locator=await ele.locator('[id="' + Country + '"]'); 
       await locator.click();
        //  AllureReporter.addStep(`Selecting destination airport: ${Country}`);
    }

    //Select departure and arrival dates
 

    async selectFromDate(value:string, date:string): Promise<void> {
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

    async selectToDate(value:string, date:string): Promise<void> {
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
    async selectPassengers(adults:number, children:number): Promise<void> {
        await this.clickOnTravelers.click();
        await this.adultsDD.selectOption(`${adults}`)
        await this.childDD.selectOption(`${children}`)
        // AllureReporter.addStep("Selecting the passengers")
    }

    async selectchildAge(Adults:number, Ages:number[], Noofchildren:number): Promise<void> {
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

    async clickOnSearchBtn(): Promise<void> {
        await this.SearchBtn.click();
        // AllureReporter.addStep(`Clicking on search button`);
    }
}
