const {Before,After,BeforeStep,AfterStep,Status} = require("@cucumber/cucumber")
const { POManager } = require("../test/steps/PageObjects_JS/POManager");
const playwright = require("@playwright/test")
let browser;
Before(async function () {
     browser = await playwright.chromium.launch({
        headless:false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
  });

  BeforeStep(async function () {
    console.log("BeforeStep - executes before each step")
  });
  
  AfterStep( async function ({result}) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    console.log("AfterStep - executes AFTER each step")
    if (result.status === Status.FAILED) {
      await this.page.screenshot({path:"fail-screenshot.png"});
    }
  });

  After(function () {
    // Assuming this.driver is a selenium webdriver
    console.log("this is last step to execute.!!!")
    browser.close();
   
  });