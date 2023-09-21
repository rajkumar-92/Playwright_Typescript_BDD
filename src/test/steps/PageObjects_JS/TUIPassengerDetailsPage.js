const TUIInputData=require('../Utility/testData.json')
const {expect} = require("@playwright/test");
class TUIPassengerDetailsPage {
    constructor(page) {
        this.page = page;
        this.adult_firstName = page.locator('#FIRSTNAMEADULT1')
        this.adult_SurName = page.locator('#SURNAMEADULT1')
        this.selectAdultGender = page.locator('#GENDERADULT1')
        this.adult_nationality = page.locator('#NATIONALITYADULT1')
        this.adult_Country = page.locator('#COUNTRYADULT1')
        this.child_firstName = page.locator('#FIRSTNAMECHILD2')
        this.adult_address= page.locator('#ADDRESS1ADULT1')
        this.adult_HouseNum= page.locator('#HOUSENUMBERADULT1')
        this.adult_postalCode= page.locator('#POSTALCODEADULT1')
        this.adult_Residency= page.locator('#TOWNADULT1')
        this.adult_emailAddress= page.locator('#EMAILADDRESSADULT1')
        this.child_LastName= page.locator('#SURNAMECHILD2')
        this.child_Gender= page.locator('#GENDERCHILD2')
        this.agreecheckbox=page.locator("//div[@class='UI__content']//span[@class='inputs__box']//*[name()='svg']")
        this.furtherbutton=page.locator('[class*="ContinueButton"] button');
        this.adultDOB_date=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='DD'])[1]")
        this.adultDOB_Month=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='MM'])[1]")
        this.adultDOB_Year=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='YYYY'])[1]")
        //this.adultDOB_Year=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='JJJJ'])[1]")
        this.childDOB_date=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='DD'])[2]")
        this.childDOB_Month=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='MM'])[2]")
        this.childDOB_Year=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='YYYY'])[2]")
        //this.childDOB_Year=page.locator("(//*[contains(@class,'PassengerFormV2')]//input[@placeholder='JJJJ'])[2]")
        //this.infantCheckbox=page.locator("div[aria-label='Infant not born yet'] span[class='inputs__box']")
        this.infantCheckbox=page.locator("(//*[name()='svg'][@class='inputs__checkIcon'])[6]")
    }

    // Enter passenger information   
    async adult1_firstName(text){
        while(this.adult_firstName.length=1){
           // await this.page.waitForSelector(this.adult_firstName, {state:'visible', timeout:400000})
            if(this.adult_firstName.length=1){
                await this.adult_firstName.fill(text);
                break;
            }
        } 
       
       
    }
    async adult1_SurName(text) {
        await this.adult_SurName.fill(text)
    }
    async selectGender(text) {
       //await this.selectAdultGender.waitFor({timeout:400000});
       //await this.page.waitForSelector(this.selectAdultGender, {state:'visible', timeout:400000})
        await this.selectAdultGender.selectOption(text)
       let selectedOption= await this.page.$eval('#GENDERADULT1', sel => sel.options[sel.options.selectedIndex].textContent)
       console.log('selectedOption:'+selectedOption) 
       await expect(selectedOption).toBe(text);
     //await this.page.pause(200)
    }
    async adult1_nationality(text) {
      //  await this.page.waitForSelector(this.adult_nationality, {timeout:10000})
        await this.adult_nationality.selectOption(text);       
    }
    async adult1_Country(text) {
       await this.adult_Country.selectOption(text);
   await this.page.waitForTimeout(1000);
        let selectedOption= await this.page.$eval('#COUNTRYADULT1', sel => sel.options[sel.options.selectedIndex].textContent)
        console.log('selectedOption:'+selectedOption) 
        await expect(selectedOption).toBe('Afghanistan');
        await this.page.waitForTimeout(500);
    }
        async selectAdult1_DOB(date,month,year){
        await (await this.adultDOB_date).fill(date);
        await (await this.adultDOB_Month).fill(month);
        await (await this.adultDOB_Year).fill(year);
        await this.page.waitForTimeout(500);
        //AllureReporter.addStep(`Input Adult1 DOB: ${date}-${month}-${year}`)
        }
    async adult1_address(text) {
      // await this.adult_address.waitFor({timeout:1000})
        await this.adult_address.fill(text)
    }
    async adult1_HouseNum(text) {
       // await this.adult_HouseNum.waitFor({timeout:5000})
        await this.adult_HouseNum.fill(text);
    }
    async adult1_postalCode(text) {
        await this.adult_postalCode.fill(text)
    }
    async adult1_Residency(text) {
        await this.adult_Residency.fill(text)
    }
    get adult1_mobileCode() {
        return this.page.locator('//select[@id="PHONECODEADULT1"]')
    }
    get adult1_mobileNum() {
        return this.page.locator('//input[@id="MOBILENUMBERADULT1"]')
    }
    async inputMobileNum(text, Num) {
        await this.adult1_mobileCode.selectOption(`${text}`);
        await this.adult1_mobileNum.fill(Num);
    }
    async adult1_emailAddress(text) {
      //  await this.adult_emailAddress.waitFor({timeout:5000})
        await this.adult_emailAddress.fill(text)
    }
    async child1_FirstName(text) {
        await this.child_firstName.fill(text);
    }
    async child1_LastName(text) {
        await this.child_LastName.fill(text)
    }
    async child1_Gender(text) {
        await this.child_Gender.selectOption(text)
        //await this.page.pause(200)
    }
        async selectchild1_DOB(date,month,year){
        await (await this.childDOB_date).fill(date);
        await (await this.childDOB_Month).fill(month);
        await (await this.childDOB_Year).fill(year);
        //AllureReporter.addStep(`Select child1 DOB: ${date}-${month}-${year}`)
        }
    async homekeeper_LastName(text) {
        await this.page.locator('//input[@id="SURNAMEnull1"]').type(text)
    }
    get homekeeper_MobileCode() {
        return this.page.locator('//select[@id="PHONECODEnull1"]')
    }
    get homekeeper_MobileNum() {
        return this.page.locator('//input[@id="MOBILENUMBERnull1"]')
    }
    async input_HomeKeeperNum(text, Num) {
        await this.homekeeper_MobileCode.selectOption(`${text}`);
        await this.homekeeper_MobileNum.fill(Num);
    }
    async infant_Notborn(){
            await this.infantCheckbox.click();
    }
    async agreeCheckbox() {
        await this.agreecheckbox.click();
    }
    async furtherButton() {
        await this.furtherbutton.click();
    }
    async clickContinueButtonOnPassengeDetails(){
       
        await this.adult1_firstName(TUIInputData.adultFirstName);
        await this.adult1_SurName(TUIInputData.adultSurName);
        await this.selectGender(TUIInputData.adultGender);
        await this.adult1_nationality(TUIInputData.Nationality);
        await this.adult1_Country(TUIInputData.Country);
        await this.selectAdult1_DOB(TUIInputData.adultDOB[0],TUIInputData.adultDOB[1],TUIInputData.adultDOB[2]);
        await this.adult1_address(TUIInputData.address_Street);
        await this.adult1_HouseNum(TUIInputData.houseNo);
        await this.adult1_postalCode(TUIInputData.postalCode);
        await this.adult1_Residency(TUIInputData.residency);
        await this.inputMobileNum(TUIInputData.mobileNo[0], TUIInputData.mobileNo[1]);
        await this.adult1_emailAddress(TUIInputData.email);
        await this.child1_FirstName(TUIInputData.childFirstName);
        await this.child1_LastName(TUIInputData.childSurName);
        await this.child1_Gender(TUIInputData.childGender);
        await this.selectchild1_DOB(TUIInputData.childDOB[0],TUIInputData.childDOB[1],TUIInputData.childDOB[2]);
        await this.infant_Notborn();
        await this.homekeeper_LastName(TUIInputData.homekeeperLastName);
        await this.input_HomeKeeperNum(TUIInputData.homekeeperNo[0], TUIInputData.homekeeperNo[1]); 
        await this.agreeCheckbox();
        await this.furtherButton();
    }
}
module.exports={TUIPassengerDetailsPage}