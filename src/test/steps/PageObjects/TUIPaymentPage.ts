//const { default: AllureReporter } = require("@wdio/allure-reporter");
//const Utility = require('../../Utilities/Utility');
const { expect } = require('@playwright/test')
exports.makePayment=class makePayment{
    constructor(page){
        this.page=page;
    }
   
    // skip payment flow
    async skip_payment() {
        await this.page.locator('[class="UI__skipPaymentsWrapper"]').click();
        AllureReporter.addStep(`Clicking on skip payment button`)
    }
}

