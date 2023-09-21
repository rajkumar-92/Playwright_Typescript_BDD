const {TUISearchPage} =require('../PageObjects_JS/TUISearchPage')
const {TUISearchResultPage} = require("../PageObjects_JS/TUISearchResultPage");
const { TUIFlightOptionsPage } = require("../PageObjects_JS/TUIFlightOptionsPage");
const { TUIExtraOptionsPage } = require("../PageObjects_JS/TUIExtraOptionsPage");
const { TUIPassengerDetailsPage } = require("../PageObjects_JS/TUIPassengerDetailsPage");


class POManager{

    constructor(page){
        this.TUISearchpage = new TUISearchPage(page);
        this.TUISearchResultpage = new TUISearchResultPage(page);
        this.TUIFlightOptionspage = new TUIFlightOptionsPage(page);
        this.TUIExtraOptionspage = new TUIExtraOptionsPage(page);
        this.TUIPassengerDetailspage = new TUIPassengerDetailsPage(page);
    }


    getTUISearchPage(){
        return this.TUISearchpage;
    }

    getTUISearchResultPage(){
        return this.TUISearchResultpage;
    }

    getTUIFlightOptionsPage(){
        return this.TUIFlightOptionspage;
    }

    getTUIExtraOptionsPage(){
        return this.TUIExtraOptionspage;
    }

    getTUIPassengerDetailsPage(){
        return this.TUIPassengerDetailspage;
    }
}

module.exports = {POManager}