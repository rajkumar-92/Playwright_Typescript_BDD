//const { default: AllureReporter } = require("@wdio/allure-reporter");
//const Utility = require('../../Utilities/Utility');
const { expect } = require('@playwright/test')
exports.bookingConfirm=class bookingConfirm6 {
    constructor(page){
        this.page=page;
    }
    
    // Booking Confirmation and Summary of flight and passengers
    get booking_referenceNum() {
        AllureReporter.addStep(`Retriving the booking reference Number`);
        let ele = this.page.locator('span[class*="BookingReference__referenceID"]');
        //Utility.waituntil_ForDisplayed(ele)
        return ele;
    }
    async closingPopBtn() {
        await this.page.locator('img[src*="close-btn"]', { setTimeout: 3000 }).click();
        AllureReporter.addStep(`Closing the POPUP button`);
    }
}

