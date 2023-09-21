import {type Page,type Locator} from "@playwright/test"
const TUIInputData=require('../Utility/testData.json')
export class TUIPassengerDetailsPage5 {
    readonly page:Page;
    readonly adult_firstName:Locator;
    readonly adult_SurName:Locator;
    readonly selectAdultGender:Locator;
    readonly adult_nationality:Locator;
    readonly adult_Country:Locator;
    readonly child_firstName:Locator;
    readonly adult_address:Locator;
    readonly adult_HouseNum:Locator;
    readonly adult_postalCode:Locator;
    readonly adult_Residency:Locator;
    readonly adult_emailAddress:Locator;
    readonly child_LastName:Locator;
    readonly child_Gender:Locator;
    readonly agreecheckbox:Locator;
    readonly furtherbutton:Locator;
    readonly adultDOB_date:Locator;
    readonly adultDOB_Month:Locator;
    readonly adultDOB_Year:Locator;
    readonly childDOB_date:Locator;
    readonly childDOB_Month:Locator;
    readonly childDOB_Year:Locator;
    readonly infantCheckbox:Locator;

    constructor(page:Page) {
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
    async adult1_firstName(text:string){
        var elements=await this.adult_firstName.textContent();
        var count=Number(elements?.length)
        while(count==1){
           // await this.page.waitForSelector(this.adult_firstName, {state:'visible', timeout:400000})
            if(count==1){
                await this.adult_firstName.fill(text);
                break;
            }
        } 
       
       
    }
    async adult1_SurName(text:string) {
        await this.adult_SurName.type(text)
    }
    async selectGender(text:string) {
       //await this.selectAdultGender.waitFor({timeout:400000});
       //await this.page.waitForSelector(this.selectAdultGender, {state:'visible', timeout:400000})
        await this.selectAdultGender.selectOption(text)
     //await this.page.pause(200)
    }
    async adult1_nationality(text:string) {
        await this.adult_nationality.selectOption(text);       
    }
    async adult1_Country(text:string) {
      //  await this.page.waitForSelector(this.adult_Country, {state:'visible', timeout:400000})
       // await this.adult_Country.waitFor({timeout:500});
        await this.adult_Country.selectOption(text);
       //await this.page.pause(200);
    }
        async selectAdult1_DOB(date:string,month:string,year:string){
        await (await this.adultDOB_date).type(date);
        await (await this.adultDOB_Month).type(month);
        //await this.adultDOB_Year.waitFor({timeout:500})
        await (await this.adultDOB_Year).type(year);
        //AllureReporter.addStep(`Input Adult1 DOB: ${date}-${month}-${year}`)
        }
    async adult1_address(text:string) {
        await this.adult_address.type(text)
    }
    async adult1_HouseNum(text:string) {
        await this.adult_HouseNum.type(text);
    }
    async adult1_postalCode(text:string) {
        await this.adult_postalCode.type(text)
    }
    async adult1_Residency(text:string) {
        await this.adult_Residency.type(text)
    }
  /*   get adult1_mobileCode() {
        return this.page.locator('//select[@id="PHONECODEADULT1"]')
    }
    get adult1_mobileNum() {
        return this.page.locator('//input[@id="MOBILENUMBERADULT1"]')
    } */
    async inputMobileNum(text:string, Num:string) {
        let adult1_mobileCode=this.page.locator('//select[@id="PHONECODEADULT1"]')
        await adult1_mobileCode.selectOption(`${text}`);
        let adult1_mobileNum=this.page.locator('//input[@id="MOBILENUMBERADULT1"]')
        await adult1_mobileNum.type(Num);
    }
    async adult1_emailAddress(text:string) {
        await this.adult_emailAddress.waitFor({timeout:5000})
        await this.adult_emailAddress.type(text)
    }
    async child1_FirstName(text:string) {
        await this.child_firstName.type(text);
    }
    async child1_LastName(text:string) {
        await this.child_LastName.type(text)
    }
    async child1_Gender(text:string) {
        await this.child_Gender.selectOption(text)
        //await this.page.pause(500)
    }
        async selectchild1_DOB(date:string,month:string,year:string){
        await (await this.childDOB_date).type(date);
        await (await this.childDOB_Month).type(month);
        await (await this.childDOB_Year).type(year);
        //AllureReporter.addStep(`Select child1 DOB: ${date}-${month}-${year}`)
        }
    async homekeeper_LastName(text:string) {
        await this.page.locator('//input[@id="SURNAMEnull1"]').type(text)
    }

    async input_HomeKeeperNum(text:string, Num:string) {
        const homekeeper_MobileCode= this.page.locator('//select[@id="PHONECODEnull1"]')
        await homekeeper_MobileCode.selectOption(`${text}`);
        const homekeeper_MobileNum=this.page.locator('//input[@id="MOBILENUMBERnull1"]')
        await homekeeper_MobileNum.type(Num);
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
