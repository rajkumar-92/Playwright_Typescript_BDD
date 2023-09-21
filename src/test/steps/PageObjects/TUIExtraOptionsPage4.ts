import {type Page } from '@playwright/test';
export class TUIExtraOptionsPage4{
    readonly page:Page;
    constructor(page:any){
        this.page=page;
    }
    
    async adultDOB(day:any, month:any, year:any) {
        await this.page.getByPlaceholder('DD').first().fill(day);
        await this.page.getByPlaceholder('MM').first().fill(month);
        await this.page.getByPlaceholder('YYYY').first().fill(year);
    }

    async childDOB(day:any, month:any, year:any) {
        await this.page.getByPlaceholder('DD').nth(1).fill(day);
        await this.page.getByPlaceholder('MM').nth(1).fill(month);
        await this.page.getByPlaceholder('YYYY').nth(1).fill(year);
    }

    //Select Insurance(Cancel + travel insurance)
    async selectInsurance(value:any, dd:any, mm:any, yy:any, dd1:any, mm1:any, yy1:any) {
        //select insurance for passengers

       const selectAll=  this.page.locator('span[class="GetQuoteV2__selectAll"]');
       //await this.page.waitForSelector(selectAll, {state:'visible', timeout:400000});
       await selectAll.click();
        await this.adultDOB(dd, mm, yy);
        await this.childDOB(dd1, mm1, yy1);
        //await this.page.waitForSelector('div[class*="GetQuoteV2__infantNotBorn"] span[class="inputs__box"]');
        await this.page.locator('div[class*="GetQuoteV2__infantNotBorn"] span[class="inputs__box"]').click({setTimeout:2000});
        await this.page.locator('button[class*="GetQuoteV2__button"]').click();
        let combiInsurance = await this.page.getByText(value);
        await combiInsurance.click();
        await this.page.locator('#insurance__component > div > div:nth-child(6) > div > section > div > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div[class=InsuranceType__priceComponent] > button').click({setTimeout:2000});
    }

    async clickContinueButtonOnInsurance() {
       const continueButton=  this.page.locator('div[class*="ContinueButton__continue"]');
       await this.page.waitForSelector('div[class*="ContinueButton__continue"]', { state: 'visible', timeout: 10000 })
      await continueButton.click();
    }
}
