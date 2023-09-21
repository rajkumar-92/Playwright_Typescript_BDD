//const { default: AllureReporter } = require("@wdio/allure-reporter");
//const { assert } = require("chai");
//const Utility = require('../../Utilities/Utility');
const { expect } = require('@playwright/test')

exports.TUIDemoPage=class TUIDemoPage {

    constructor(page) {
        this.userName = page.locator('#userNameInput');
        this.passWord = page.locator('#passwordInput');
        this.clickBtn = page.locator("#submitButton");
        this.webPopUp = page.locator('#Ebene_1');
        this.clickOnPop = page.locator('[class="cmButtons"] #cmCloseBanner');
        this.LanguageLink = page.locator('.cl-flag-icon');
        this.Dropdown = page.locator("select[name='langCode']");
        this.LngsubmitBtn = page.locator('button[type="submit"]');
        this.departPort=page.locator('tui-flight-search-bar #searchField-airport-outbound')


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

    async accept() {
        var length = await this.webPopUp.count();
        if (length > 0) {
          await this.clickOnPop.click();
        }
    }

    async selectPrefLanguage() {
         await this.LanguageLink.click();
         await this.Dropdown.selectOption({label:'English'})
         await this.LngsubmitBtn.click();
       
    }

    get clickOnTravelers() {
        return $('tui-flight-search-bar').shadow$('#searchField-pax');
    }

    async selectDate(date, month, year) {
        await (await this.selectDate).setValue(date);
        await (await this.selectMonth).setValue(month);
        await this.selectYear.setValue(year);
    }

    async ClickOn_departPort() {
       // const element = await $('tui-flight-search-bar').shadow$('#searchField-airport-outbound');
        //await element.click();
        //AllureReporter.addStep(`Clicking on Choose airport`);
        await this.departPort.click();
    }

    async selectDepartPort(Country) {
        const element = await $('tui-flight-search-bar').shadow$(`#${Country}`);
        await element.click();
        AllureReporter.addStep(`Selecting departure airport: ${Country}`);
    }

    async ClickOn_destinationPort() {
        const element = await $('tui-flight-search-bar').shadow$('#searchField-airport-inbound');
        await element.click();
        AllureReporter.addStep(`Clicking on Choose a destination`);
    }

    async selectDestinationtPort(Country) {
        const ele = $('tui-flight-search-bar').shadow$('ul[class*="list__"]:nth-child(1)>li>a[id="' + Country + '"]');
        //const ele = $('tui-flight-search-bar').shadow$('ul[class*="list"] a[id="'+Country+'"]');
        await ele.click();
        AllureReporter.addStep(`Selecting destination airport: ${Country}`);
    }

    async selectFromDate(value, date) {
        const calendarTB = await $('tui-flight-search-bar').shadow$('#searchField-date-outbound');
        await calendarTB.click();

        const monthDD = await $('tui-flight-search-bar').shadow$('#selectBox');
        await monthDD.click();
        const monthvalues = await $('tui-flight-search-bar').shadow$$('#selectBox option');
        for (var m = 0; m < monthvalues.length; m++) {
            console.log(monthvalues[m].getText());
            if (await monthvalues[m].getAttribute('value') === value) {
                await monthvalues[m].click();
                break;
            }
        }
        var elements = await $('tui-flight-search-bar').shadow$$('#calendarItems-outbound:nth-child(3) div[class*="entry"]');

        for (var i = 0; i < elements.length; i++) {
            var actualDate = await elements[i].getText();
            if (actualDate === date) {
                var attribute = await elements[i].getAttribute('class');
                // await expect(attribute).to.contain("available");
                if(attribute.includes('available'))
                {
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

        AllureReporter.addStep(`Selecting From date`)
    }

    async selectToDate(value, date) {
        const calendarTB = await $('tui-flight-search-bar').shadow$('#searchField-date-inbound');
        await calendarTB.click();

        const monthDD = await $('tui-flight-search-bar').shadow$('[id*=calendar-inbound] #selectBox');
        await monthDD.click();
        const monthvalues = await $('tui-flight-search-bar').shadow$$('[id*=calendar-inbound] #selectBox option');
        for (var m = 0; m < monthvalues.length; m++) {
            console.log(monthvalues[m].getText());
            if (await monthvalues[m].getAttribute('value') === value) {
                await monthvalues[m].click();
            }
        }
        await browser.pause(3000);
        var elements = await $('tui-flight-search-bar').shadow$$('[id*=calendar-inbound] #calendarItems-inbound div[class*="entry"]');
        for (var i = 0; i < elements.length; i++) {
            var actualDate = await elements[i].getText();
            if (actualDate === date) {
                var attribute = await elements[i].getAttribute('class');
                // await expect(attribute).to.contain("available");
                if (attribute.includes('available')) {
                    await elements[i].click();
                    break;
                }
                else {
                    for (++i; i < elements.length; i++) {
                        var attribute = await elements[i].getAttribute('class');
                        if (attribute.includes('available')) {
                            await elements[i].click();
                            break;
                        }
                    }
                    break;
                }
            }
        }
        AllureReporter.addStep(`Selecting ToDate`)
    }

    /* async selectPassengers(adults, children, child1Age) {
        await (await this.clickOnTravelers).click();
        let adultsDD = await $('tui-flight-search-bar').shadow$('#travelPartySelectAdults');
        await Utility.dropDown_ByAttribute(adultsDD, "value", adults)
        let childDD = await $('tui-flight-search-bar').shadow$('#travelPartySelectChildren');
        await Utility.dropDown_ByAttribute(childDD, "value", children)
        let child1AgeDD = await $('tui-flight-search-bar').shadow$('#childAgeSelectionSection select[class="child-age-sel"]');
        await Utility.dropDown_ByAttribute(child1AgeDD, "value", child1Age)
        AllureReporter.addStep(`Selecting Passengers: Adults: ${adults} nos, Child:${children} nos & childAge: ${child1Age} yrs. `)
    } */

    async selectchildAge(Adults, Ages, Noofchildren) {
        var infantCount = 0;
        for (var i = 0; i < Noofchildren; i++) {
            let locator = await $('tui-flight-search-bar').shadow$('#childAgeSelectionSection div[class*="group"] select[name="' + i + '"]');
            await Utility.dropDown_ByAttribute(locator, "value", Ages[i]);
            // await locator.getText('option:checked');
            if (Ages[i] <= 1) {
                infantCount++;
            }
            if (infantCount > Adults) {
                let errorMsg = await $('tui-flight-search-bar').shadow$('#errorMsgPaxPanel div[class*="text"]');
                expect(errorMsg).to.exist;
                //expect(errorMsg).not.to.exist;
                assert.fail();
            }
        }
    }
    async selectPassengers(adults, children) {
        await (await this.clickOnTravelers).click();
        let adultsDD = await $('tui-flight-search-bar').shadow$('#travelPartySelectAdults');
        await Utility.dropDown_ByAttribute(adultsDD, "value", adults)
        let childDD = await $('tui-flight-search-bar').shadow$('#travelPartySelectChildren');
        await Utility.dropDown_ByAttribute(childDD, "value", children)
    }
    async childrenValidations() {
        let adultsDD = await $('tui-flight-search-bar').shadow$('#travelPartySelectAdults');
        let childCount = 0;
        let adultCount = adultsDD.getText('option:checked');
        let childAgeDD = await $('tui-flight-search-bar').shadow$('#childAgeSelectionSection select[class="child-age-sel"]');
        let errorMsg = await $('tui-flight-search-bar').shadow$('#errorMsgPaxPanel div[class="text__a45ec"]>div');
        for (var i = 0; i < childAgeDD.length; i++) {
            const selectedAge = childAgeDD[i].getText('option:checked')
            if (selectedAge < 2) {
                childCount++
            }
        }
        if (childCount >= adultCount) {
            expect(errorMsg).toHaveText('For legal reasons, the number of infants needs to be the same as or less than the number of adults.')
            assert.fail();
        }

        //AllureReporter.addStep(`Selecting Passengers: Adults: ${adults} nos, Child:${children} nos & childAge: ${child1Age} yrs. `)
        AllureReporter.addStep(`Selecting the passengers`)
    }


    async clickOnSerchBtn() {
        let ele = await $('tui-flight-search-bar').shadow$('#searchButton');
        await ele.click();
        AllureReporter.addStep(`Clicking on search button`);
    }


    async OutBound_ListOfFlights() {
        let availableDates = await $$("(//*[@class='carousel__carouselContainer'])[1]//div[@class='DataCarouselItem__dateCarouselItem']");
        let activeDate = await $("(//*[@class='carousel__carouselContainer'])[1]//div[contains(@class,'activeTab')]")

        //Add active date and price to map
        let active_date = await (await activeDate.getText()).split('\n')[0];
        let active_price = await (await activeDate.getText()).split('\n')[1].split('€')[1];
        var map = new Map();
        map.set(active_date, active_price);
        let availableDateArray = [];
        let availablePriceArray = [];

        for (var i = 0; i < availableDates.length; i++) {
            var dateandprice = await availableDates[i].getText();
            availableDateArray[i] = await dateandprice.split('\n')[0];
            availablePriceArray[i] = await dateandprice.split('\n')[1].split('€')[1];
            //Add active date and price to map
            map.set(availableDateArray[i], availablePriceArray[i]);
        }
        const sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1])); //sorting the map
        const sortedDatePriceArray = [...sortedMap]; //converting map to array
        //If the active date is not having cheapest price, pick the cheapest price from other available dates
        var cheapestpricedDate = sortedDatePriceArray[0][0]
        if (cheapestpricedDate != active_date) {
            for (i = 0; i < availableDateArray.length; i++) {
                if (availableDateArray[i] === cheapestpricedDate) {
                    await availableDates[i].click();
                    break;
                }
            }

        }

    }
    async Return_ListOfFlights() {
        let availableDates = await $$("(//*[@class='carousel__carouselContainer'])[2]//div[@class='DataCarouselItem__dateCarouselItem']");
        let activeDate = await $("(//*[@class='carousel__carouselContainer'])[2]//div[contains(@class,'activeTab')]")

        //Add active date and price to map
        let active_date = await (await activeDate.getText()).split('\n')[0];
        let active_price = await (await activeDate.getText()).split('\n')[1].split('€')[1];
        var map = new Map();
        map.set(active_date, active_price);
        let availableDateArray = [];
        let availablePriceArray = [];

        for (var i = 0; i < availableDates.length; i++) {
            var dateandprice = await availableDates[i].getText();
            availableDateArray[i] = await dateandprice.split('\n')[0];
            availablePriceArray[i] = await dateandprice.split('\n')[1].split('€')[1];
            //Add active date and price to map
            map.set(availableDateArray[i], availablePriceArray[i]);
        }
        const sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1])); //sorting the map
        const sortedDatePriceArray = [...sortedMap]; //converting map to array
        //If the active date is not having cheapest price, pick the cheapest price from other available dates
        var cheapestpricedDate = sortedDatePriceArray[0][0]
        if (cheapestpricedDate != active_date) {
            for (i = 0; i < availableDateArray.length; i++) {
                if (availableDateArray[i] === cheapestpricedDate) {
                    await availableDates[i].click();
                    break;
                }
            }

        }

    }

    async selectCheapestOutboundFlight()
    {       
        var availableFlightsPrice=await $$("(//*[@class='FlightCardsList__flightCardsList'])[1]//*[@class='FlightInformation__priceInfo']");
        var price=[];
        for(var i=0;i<availableFlightsPrice.length;i++)
        {
             price[i]=(await availableFlightsPrice[i].getText()).split('€')[1];            
        }
     var sortedPrice=price.sort(); //209.99,309.99
     var pricetext=sortedPrice[0].split('.')[0];
     
     var flightselectionButton=await $("(//div[@class='FlightCardsList__flightCardsList'])[1]//*[text()='"+pricetext+"']/../../../..//div[contains(@class,'selectionStatus')]//button");
    await flightselectionButton.click();
    }
    async selectCheapestReturnFlight()
    {       
        var availableFlightsPrice=await $$("(//*[@class='FlightCardsList__flightCardsList'])[2]//*[@class='FlightInformation__priceInfo']");
        var price=[];
        for(var i=0;i<availableFlightsPrice.length;i++)
        {
             price[i]=(await availableFlightsPrice[i].getText()).split('€')[1];            
        }
     var sortedPrice=price.sort(); //309.99,369
     var pricetext=sortedPrice[0].split('.')[0];
     var flightselectionButton=await $("(//div[@class='FlightCardsList__flightCardsList'])[2]//*[text()='"+pricetext+"']/../../../..//div[contains(@class,'selectionStatus')]//button");
    await flightselectionButton.click();
    }
    
    async OutboundFlight(date) {
        let bound = await $('(//div[contains(@id,"flightsearchresults")]//div[contains(@class,"carouselContainer")])[1]')
        let prevBtn = await bound.$('//div[contains(@class,"prevBtn")]')
        let nextBtn = await bound.$('//div[contains(@class,"nextBtn")]')
        // let elements=await bound.$$('//span[contains(@class,"tabFlightDate")//span]')
        let elements = await $$('(//div[contains(@id,"flightsearchresults")]//div[contains(@class,"carouselContainer")])[1]//span[contains(@class,"tabFlightDate")]//span')
        for (var i = 0; i < elements.length; i++) {
            var actualDate = await elements[i].getText();
            if (actualDate === date) {
                var attribute = await elements[i].isEnabled();
                if (attribute === true)
                    // await expect(attribute).to.contain("available");
                    await elements[i].click();
                break;

            }
        }

    }

    async OutboundFlight1(date) {

        var activeDate = await $("[class*='DataCarouselItem__activeTab']");
        var availableDates = await $$("[class='DataCarouselItem__dateCarouselItem']");
        var availableDatesList = [];
        availableDatesList.push((await Number(activeDate.getText()).split('€')[1]));
        for (var i = 0; i < availableDates.length; i++) {
            var text = await availableDates[i].getText();
            var price = text.split('€')
            availableDatesList.push(Number(price[1]));
        }
        console.log(availableDatesList);


    }
    async select_OutboundFlight(text) {

        let ele = await $(`(//div[@class='FlightCardsList__flightCardsList'][1]//div[@class='FlightInformation__selectionStatus'])[${text}]`);
        await Utility.waituntil_ForDisplayed(ele)
        await Utility.scrollIntoView(ele);
        await ele.click();
        AllureReporter.addStep(`Selecting Outbound Flight from Available List`)
    }

    async select_ReturnFlight(text) {
        let ele = await $(`(//div[@class='FlightCardsList__flightCardsList'][2]//div[@class='FlightInformation__selectionStatus'])[${text}]`);
        await Utility.scrollIntoView(ele);
        await ele.click();
        AllureReporter.addStep(`Selecting Return Flight from Available List`)
    }

    async clickContinueButton() {
        let ele = await $('button[class*="ContinueButton"]')
        await Utility.waituntil_ForDisplayed(ele)
        await ele.click()
        AllureReporter.addStep(`Clicking on continue button`);
    }
    async price(){
        var priceElement = $('tui-fo-price-summary').shadow$('div[class="price"]');
       // await Utility.waituntil_ForDisplayed(priceElement);
        var price = await (await priceElement.getText()).slice(1);
        var TotalAmount = await parseFloat(price);
        return TotalAmount;
    }
    async LuggagePrice(){
        var Element = $('tui-fo-special-service-luggage').shadow$('div[class*="luggageFooter"]>div>h5>b');
        await browser.pause(2000);
        var Luggageprice = await (await Element.getText()).split('€')[1];
        var TotalAmount = await parseInt(Luggageprice);
        return TotalAmount;
    }

    async selectOutBound_BaggageWeight(Baggage) {
        var Exp_TotalAmount;
        var Exp_LuggageAmount;
        let elements = await $('tui-fo-special-service-luggage').shadow$$('div[class*="serviceWrapper"]>div:nth-child(3)>div');
        if (elements.length = 2) {
            var actualAmount = await this.price();
            var actualBaggageAmount = await this.LuggagePrice();
            Exp_TotalAmount = actualAmount;
            Exp_LuggageAmount = actualBaggageAmount;
            var outboundElements = await $('tui-fo-special-service-luggage').shadow$$('div[class*="serviceWrapper"]>div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>div>ul');
            for (var i = 0; i < outboundElements.length; i++) {
                let weightcodes = await outboundElements[i].$$('ul[class*="serviceListCard"] >div>div[class*="titleWrapper"]')
                for (var j = 0; j < weightcodes.length; j++) {
                    var weightage = await weightcodes[j].getText();
                    var priceLocator = await (await weightcodes[j].nextElement()).getText();
                    var price = await parseInt(priceLocator.split('€')[1])
                    if (weightage === Baggage[i]) {
                        await weightcodes[j].click();
                        await browser.pause(2000);
                        Exp_TotalAmount = Exp_TotalAmount + price;
                        Exp_LuggageAmount = Exp_LuggageAmount + price;
                        break;
                    }
                }
            }
        }
        return [Exp_TotalAmount,Exp_LuggageAmount]
       // await browser.pause(1000);
        //assert.equal(await this.price(), Exp_TotalAmount);
        //assert.equal(await this.LuggagePrice(), Exp_LuggageAmount);

    }

    async clickonCheckBox() {
        let ele = await $('tui-fo-special-service-luggage').shadow$('div[class*="checkboxWrapper"]>div');
        await ele.click();
    }

    async selectReturn_BaggageWeight(Baggage) {
        let elements = await $('tui-fo-special-service-luggage').shadow$$('div[class*="serviceWrapper"]>div:nth-child(3)>div');
        var Exp_LuggageAmount;
        var Exp_TotalAmount;
        
        if (elements.length > 2) {
           var Actual_LuggageAmount=await this.LuggagePrice();
           var Actual_TotalAmount=await this.price();
             Exp_LuggageAmount = Actual_LuggageAmount/2;
             Exp_TotalAmount = Actual_TotalAmount-Exp_LuggageAmount;
            var outboundElements = await $('tui-fo-special-service-luggage').shadow$$('div[class*="serviceWrapper"]>div:nth-child(3)>div:nth-child(2)>div:nth-child(2)>div>ul');
            for (var i = 0; i < outboundElements.length; i++) {
                let weightcodes = await outboundElements[i].$$('ul[class*="serviceListCard"] >div>div[class*="titleWrapper"]')
                let selected = await outboundElements[i].$$('ul[class*="serviceListCard"] >div')
                for (var j = 0; j < weightcodes.length; j++) {
                    var weightage = await weightcodes[j].getText();
                    var priceLocator = await (await weightcodes[j].nextElement()).getText();
                    var price = await parseInt(priceLocator.split('€')[1])
                    var attribute = await selected[j].getAttribute('class');
                if (weightage === Baggage[i] && !attribute.includes('selected')) {
                    await weightcodes[j].click();
                    await browser.pause(2000);
                    Exp_TotalAmount = Exp_TotalAmount + price;
                    Exp_LuggageAmount = Exp_LuggageAmount + price;
                    break;
                }
                else if (weightage === Baggage[i] && attribute.includes('selected')) {
                    Exp_TotalAmount = Exp_TotalAmount + price;
                    Exp_LuggageAmount = Exp_LuggageAmount + price;
                    break;
                }
                }
            }
        }
        return [Exp_TotalAmount,Exp_LuggageAmount]
       // return Exp_TotalAmount,Exp_LuggageAmount;
        //assert.equal(await this.price(), Exp_TotalAmount);
        //assert.equal(await this.LuggagePrice(), Exp_LuggageAmount);
    } 
    
    async clickContinueButtonOnSeatBaggage() {
        let ele = await $('button[aria-label*="continue button"]')
        await Utility.waituntil_ForDisplayed(ele)
        await ele.click();
        AllureReporter.addStep(`Clicking on Continue Button`)
    }

    get SportsEquiment_Link(){
        return $('tui-fo-special-service-sports').shadow$('div[class*="link"]')
    }

    async selectInsurance(value) {
        var insuranceCodes = await $$('[aria-label="Insurance name"]');
        for (var i = 0; i < insuranceCodes.length; i++) {
            if (await insuranceCodes[i].getText() === value) {
                await insuranceCodes[i].click();
                browser.pause(4000);
            }
        }
        AllureReporter.addStep(`Selecting the Insurance type:${value}`)
    }

    async adult1_firstName(text) {

        let ele = await $('#FIRSTNAMEADULT1')
        await Utility.scrollIntoView(ele)
        await ele.setValue(text);
        //AllureReporter.addStep(`Input Adult1 FirstName: ${text}`)
        AllureReporter.addStep(`Inputing  Adult1 Information`)
    }

    async adult1_SurName(text) {
        await (await $('#SURNAMEADULT1')).setValue(text);
        //AllureReporter.addStep(`Input Adult1 SurName: ${text}`)
    }

    get adult1_Gender() {
        return $('#GENDERADULT1');
    }

    async selectGender(text) {
        await Utility.dropDown_ByVisibleText(this.adult1_Gender, text)
        // AllureReporter.addStep(`Select Adult1 Gender: ${text}`)
    }

    async adult1_nationality(text) {
        let ele = await $('#NATIONALITYADULT1')
        await ele.selectByAttribute('value', text)
        // AllureReporter.addStep(`Select Adult1 Nationality: ${text}`)
    }

    async adult1_country(text) {
        let ele = await $('#COUNTRYADULT1')
        await ele.selectByAttribute('value', text)
        // AllureReporter.addStep(`Select Adult1 country: ${text}`)
    }

    get adult1DOB_date() {
        return $("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='DD'])[1]");
    }

    get adult1DOB_Month() {
        return $("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='MM'])[1]");
    }

    get adult1DOB_Year() {
        return $("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='JJJJ'])[1]");
    }

    async selectAdult1_DOB(date, month, year) {
        await (await this.adult1DOB_date).setValue(date);
        await (await this.adult1DOB_Month).setValue(month);
        await (await this.adult1DOB_Year).setValue(year);
        //AllureReporter.addStep(`Input Adult1 DOB: ${date}-${month}-${year}`)
    }

    async adult1_address(text) {
        await (await $('#ADDRESS1ADULT1')).setValue(text);
        //AllureReporter.addStep(`Input Adult1 address: ${text}`)
    }

    async adult1_HouseNum(text) {
        await (await $('#HOUSENUMBERADULT1')).setValue(text);
        // AllureReporter.addStep(`Input Adult1 HouseNum: ${text}`)
    }

    async adult1_postalCode(text) {
        await (await $('#POSTALCODEADULT1')).setValue(text)
        //AllureReporter.addStep(`Input Adult1 postalCode: ${text}`)
    }

    async adult1_Residency(text) {
        await (await $('#TOWNADULT1')).setValue(text)
        //AllureReporter.addStep(`Input Adult1 Residency: ${text}`)
    }

    get adult1_mobileCode() {
        return $('#PHONECODEADULT1')
    }
    get adult1_mobileNum() {
        return $('#MOBILENUMBERADULT1')
    }

    async inputMobileNum(text, Num) {
        (await this.adult1_mobileCode).selectByAttribute('value', text);
        await (await this.adult1_mobileNum).setValue(Num);
        //AllureReporter.addStep(`Input Adult1 MobileNum: ${Num}`)
    }

    async adult1_emailAddress(text) {
        await (await $('#EMAILADDRESSADULT1')).setValue(text)
        //AllureReporter.addStep(`Input Adult1 emailAddress: ${text}`)
    }

    get checkboxes() {
        return $('//span[@class="inputs__box"]')
    }

    async selectCheckbox(value) {
        let element = await $('[name*="' + value + '"]');
        await element.click();
    }

    async child1_FirstName(text) {
        await (await $('[aria-label="input container"] #FIRSTNAMECHILD2')).setValue(text)
        // AllureReporter.addStep(`Input child1 FirstName: ${text}`)
        AllureReporter.addStep(`Inputing Child1 Information`)
    }

    async child1_LastName(text) {
        await (await $('[aria-label="input container"] #SURNAMECHILD2')).setValue(text)
        //AllureReporter.addStep(`Input child1 LastName: ${text}`)
    }

    async child1_Gender(text) {
        let ele = await $('#GENDERCHILD2')
        await ele.selectByVisibleText(text)
        //AllureReporter.addStep(`Select child1 Gender: ${text}`)
    }

    get child1DOB_date() {
        return $("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='DD'])[2]");
    }

    get child1DOB_Month() {
        return $("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='MM'])[2]");
    }

    get child1DOB_Year() {
        return $("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='JJJJ'])[2]");
    }

    async selectchild1_DOB(date, month, year) {
        await (await this.child1DOB_date).setValue(date);
        await (await this.child1DOB_Month).setValue(month);
        await (await this.child1DOB_Year).setValue(year);
        //AllureReporter.addStep(`Select child1 DOB: ${date}-${month}-${year}`)
    }

    async homekeeper_LastName(text) {
        await (await $('#SURNAMEnull1')).setValue(text)
    }

    get homekeeper_MobileCode() {
        return $('#PHONECODEnull1')
    }

    get homekeeper_MobileNum() {
        return $('#MOBILENUMBERnull1')
    }

    async input_HomeKeeperNum(text, Num) {
        (await this.homekeeper_MobileCode).selectByAttribute('value', text);
        await browser.pause(2000)
        await (await this.homekeeper_MobileNum).setValue(Num);
    }

    async agreeCheckbox() {
        await (await $("div[class='UI__content'] span[class='inputs__box']")).click();
    }

    async furtherButton() {
        let ele = await $('[class*="ContinueButton"] button');
        await ele.click();
        AllureReporter.addStep(`Clicking on continue button`)
    }

    async skip_payment() {
        let ele = await $('[class="UI__skipPaymentsWrapper"]');
        await ele.click();
        AllureReporter.addStep(`Clicking on skip payment button`)
    }

    async closingPopBtn() {
        await (await $('img[src*="close-btn"]')).click();
        AllureReporter.addStep(`Closing the POPUP button`)
    }

    get booking_referenceNum() {
        AllureReporter.addStep(`Retriving the booking reference Number`)
        let ele = $('span[class*="BookingReference__referenceID"]');
        return ele;

    }

}








