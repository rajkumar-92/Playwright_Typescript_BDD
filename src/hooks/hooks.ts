import { Before,After } from "@cucumber/cucumber";
import { pageFixture } from "./pageFixture";
import { chromium,Browser,Page } from "@playwright/test";


let browser:Browser;
let page:Page;

Before(async function() {
browser=await chromium.launch({headless:false});
const page=await browser.newPage(); 
pageFixture.page=page;
});

After(async function() {
  await pageFixture.page.close();
  await browser.close();
    });