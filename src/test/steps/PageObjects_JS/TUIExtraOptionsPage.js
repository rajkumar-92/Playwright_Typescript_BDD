
class TUIExtraOptionsPage{
    constructor(page){
        this.page=page;
    }
    
    async adultDOB(day, month, year) {
        await this.page.getByPlaceholder('DD').first().fill(day);
        await this.page.getByPlaceholder('MM').first().fill(month);
        await this.page.getByPlaceholder('YYYY').first().fill(year);
    }

    async childDOB(day, month, year) {
        await this.page.getByPlaceholder('DD').nth(1).fill(day);
        await this.page.getByPlaceholder('MM').nth(1).fill(month);
        await this.page.getByPlaceholder('YYYY').nth(1).fill(year);
    }

    //Select Insurance(Cancel + travel insurance)
    async selectInsurance(value, dd, mm, yy, dd1, mm1, yy1) {
        //select insurance for passengers

       const selectAll= await this.page.locator('span[class="GetQuoteV2__selectAll"]');
       //await this.page.waitForSelector(selectAll, {state:'visible', timeout:400000});
       await selectAll.click();
        await this.adultDOB(dd, mm, yy);
        await this.childDOB(dd1, mm1, yy1);
        await this.page.waitForTimeout(500);
        //await this.page.waitForSelector('div[class*="GetQuoteV2__infantNotBorn"] span[class="inputs__box"]');
        await this.page.locator('div[class*="GetQuoteV2__infantNotBorn"] span[class="inputs__box"]').click({setTimeout:2000});
        await this.page.locator('button[class*="GetQuoteV2__button"]').click({setTimeout:2000});
        let combiInsurance = await this.page.getByText(value);
        await combiInsurance.click({setTimeout:2000});
        await this.page.locator('#insurance__component > div > div:nth-child(6) > div > section > div > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div[class=InsuranceType__priceComponent] > button').click({setTimeout:2000});
    }

    async clickContinueButtonOnInsurance() {
       // await this.page.waitForSelector('(//*[name()="svg"][@class="inputs__checkIcon"])[6]')
      // const ele= this.page.locator('(//*[name()="svg"][@class="inputs__checkIcon"])[6]')
       //await ele.waitFor({state:"visible"});
      //  await this.page.locator('(//*[name()="svg"][@class="inputs__checkIcon"])[6]').click();
       // await this.page.getByRole('button', { name: 'extra options continue button' })
       const continueButton= await this.page.locator('div[class*="ContinueButton__continue"]');
       await continueButton.waitFor({timeout:40000});
       //await this.page.waitForSelector(continueButton, {state:'visible', timeout:400000})
      await continueButton.click();
    }
}
module.exports={TUIExtraOptionsPage}
