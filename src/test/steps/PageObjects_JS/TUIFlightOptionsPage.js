//const TUIInputData=require('../Utility/testData.json')

class TUIFlightOptionsPage {
    constructor(page) {
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
    let luggageprice=await this.page.locator('tui-fo-special-service-luggage div[class*="luggageFooter"]')
    let luggagepriceText=await luggageprice.locator('div>h5').textContent();
    console.log('luggagepriceText'+luggagepriceText)
        var split = luggagepriceText.split('€')[1];
        var TotalAmount = parseInt(split);
        return TotalAmount;
    }  

    async selectOutBound_BaggageWeight(Baggage) {
        const ele = await this.page.locator('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
        let elements = await ele.locator('div').nth(2).locator('div');
       //await this.page.pause(2000)
   
        if (elements.length = 2) {
           // var Actual_TotalAmount = await this.price();
           // var Exp_TotalAmount = Actual_TotalAmount;
           // var Exp_LuggageAmount = 0;
          
            const outboundElements1 = await this.page.$('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
            //await this.page.waitForTimeout(2000);
            await this.page.waitForSelector('div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>div>ul')
            var outboundElements = await outboundElements1.$$('div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>div>ul');

            // expect(outboundElements).to.have.length(12);
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
                      //  Exp_TotalAmount = Exp_TotalAmount + price;
                      //  Exp_LuggageAmount = Exp_LuggageAmount + price;
                        break;
                    }
                }
        
            
        }
        }
       // return Exp_LuggageAmount/2;
    }

    async clickonCheckBox() {
   await this.returncheckbox.click();
    }

    async selectReturn_BaggageWeight(Baggage) {
        const ele = await this.page.locator('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
        let elements = await ele.locator('div').nth(3).locator('div').nth(2).locator('div').nth(2);
       // await this.page.pause()
        if (elements.length = 2) {
           // var Actual_TotalAmount = await this.price();
           // var Exp_TotalAmount = Actual_TotalAmount;
           var Actual_LuggageAmount = await this.LuggagePrice()/2;
            var Exp_LuggageAmount=Actual_LuggageAmount+0;
        
            const returnElements1 = await this.page.$('tui-fo-special-service-luggage div[class*="serviceWrapper"]');
           await this.page.waitForSelector('tui-fo-special-service-luggage div[class*="serviceWrapper"]')
    
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
                       // Exp_TotalAmount = Exp_TotalAmount + price;
                        Exp_LuggageAmount = Exp_LuggageAmount + price;
                        break;
                    }
                }
            }
        }
        return Exp_LuggageAmount;
    }

    async verifyingLuggageText(){
        let BaggageSelection= await this.page.locator('tui-fo-special-service-luggage div[class*="luggageFooter"]')
        let Adult1_OutboundBaggageText=BaggageSelection.locator('div>div>div:nth-child(1)>div:nth-child(2)');
        let Adult1_ReturnBaggageText=BaggageSelection.locator('div>div>div:nth-child(1)>div:nth-child(3)');
        let Child1_OutboundBaggageText=BaggageSelection.locator('div>div>div:nth-child(2)>div:nth-child(2)');
        let Child1_ReturnBaggageText=BaggageSelection.locator('div>div>div:nth-child(2)>div:nth-child(3)');
    return [Adult1_OutboundBaggageText,Adult1_ReturnBaggageText,Child1_OutboundBaggageText,Child1_ReturnBaggageText];
    }
    async luggagePrice(){
let luggageprice=await this.page.locator('tui-fo-special-service-luggage div[class*="luggageFooter"]')
let luggagepriceText=luggageprice.locator('div>h5').textContent();
return luggagepriceText;

    }

    async clickContinueButtonOnSeatBaggage() {
        
      const continueButton= this.page.locator('button[aria-label*="continue"]')
      //await continueButton.waitFor({timeout:400000});
     // await this.page.waitForSelector(continueButton, {state:'visible', timeout:400000})
      await continueButton.click();
    }
}
module.exports={TUIFlightOptionsPage}