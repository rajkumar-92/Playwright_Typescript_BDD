import {type Page,type Locator} from "@playwright/test"
export class TUIFlightOptionsPage3 {
    readonly page: Page;
    readonly returncheckbox: Locator;
    readonly LuggagePriceLocator: Locator;
    readonly priceElement: Locator;
    constructor(page: Page) {
        this.page = page;
        this.returncheckbox = page.locator('tui-fo-special-service-luggage div[class*="checkboxWrapper"]')
        this.LuggagePriceLocator = page.locator('tui-fo-price-summary div.serviceWrapper___GZhc6 > div.luggageFooter__0c7927 > div > h5 > b')
        this.priceElement = page.locator('tui-fo-price-summary div[class="price"]');
    }

    async price() {
        var abc = await this.priceElement.textContent();
        var price = await abc.slice(1);
        var TotalAmount = parseFloat(price);
        return TotalAmount;
    }

    async LuggagePrice() {
        var Luggageprice = await this.LuggagePriceLocator.textContent();
        var split = Luggageprice.split('€')[1];
        var TotalAmount = parseInt(split);
        return TotalAmount;
    }

    async selectOutBound_BaggageWeight(Baggage) {
        const ele = await this.page.locator('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
        let elements = await ele.locator('div').nth(2).locator('div');
        if (elements.length = 2) {
            var Actual_TotalAmount = await this.price();
            var Exp_TotalAmount = Actual_TotalAmount;
            var Exp_LuggageAmount = 0;
            const outboundElements1 = await this.page.$('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
          //await outboundElements1.waitFor({timeout:400000});
            //await this.page.waitForSelector(outboundElements1, {state:'visible', timeout:400000})
            var outboundElements = await outboundElements1.$$('div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>div>ul');
            for (var i = 0; i < outboundElements.length; i++) {
                let weightcodes = await outboundElements[i].$$('div[class*="card"]')
                for (var j = 1; j < weightcodes.length; j++) {
                    var text = await weightcodes[j].textContent();
                    var weightage = await text.split('€')[0].slice(-5);
                    var pircetxt = await text.split('€')[1].slice(0);
                    var price = parseInt(pircetxt)
                    if (weightage === Baggage[i]) {
                        await weightcodes[j].click();
                       // await this.page.pause(500)
                        Exp_TotalAmount = Exp_TotalAmount + price;
                        Exp_LuggageAmount = Exp_LuggageAmount + price;
                        break;
                    }
                }
            }
        }
        return [Exp_TotalAmount, Exp_LuggageAmount];
    }

    async clickonCheckBox() {
        let ele = await this.returncheckbox.click();
    }

    async selectReturn_BaggageWeight(Baggage) {
        const ele = await this.page.locator('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
        let elements = await ele.locator('div').nth(3).locator('div').nth(2).locator('div').nth(2);
        if (elements.length = 2) {
            var Actual_TotalAmount = await this.price();
            var Exp_TotalAmount = Actual_TotalAmount;
            var Exp_LuggageAmount = 0;
            const returnElements1 = await this.page.$('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
            var returnElements = await returnElements1.$$('div:nth-child(3)>div:nth-child(2)>div:nth-child(2)>div>ul');
            for (var i = 0; i < returnElements.length; i++) {
                let weightcodes = await returnElements[i].$$('div[class*="card"]')
                for (var j = 1; j < weightcodes.length; j++) {
                    var text = await weightcodes[j].textContent();
                    var weightage = await text.split('€')[0].slice(-5);
                    var pircetxt = await text.split('€')[1].slice(0);
                    var price = parseInt(pircetxt)
                    if (weightage === Baggage[i]) {
                        await weightcodes[j].click();
                        Exp_TotalAmount = Exp_TotalAmount + price;
                        Exp_LuggageAmount = Exp_LuggageAmount + price;
                        break;
                    }
                }
            }
        }
        return [Exp_TotalAmount, Exp_LuggageAmount];
    }

    async clickContinueButtonOnSeatBaggage() {
        
      const continueButton= this.page.locator('button[aria-label*="continue"]')
      //await continueButton.waitFor({timeout:400000});
     // await this.page.waitForSelector(continueButton, {state:'visible', timeout:400000})
      await continueButton.click();
      
       
      
 
    }
}
