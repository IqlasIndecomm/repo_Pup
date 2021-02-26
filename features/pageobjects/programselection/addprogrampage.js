const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const utils = require('../../../utilities/commonUtils');

class addprogrampage {
    async clickfirstprogram(page) {
        await page.waitForSelector('#cas-content-wrapper > section > program-selector > div > div.cas-program-selector-component-list > programs-table > div > table > tbody:nth-child(3) > tr > td.cas-add-program-row.cas-add-program-td.ng-scope > button > i')
        await page.click('#cas-content-wrapper > section > program-selector > div > div.cas-program-selector-component-list > programs-table > div > table > tbody:nth-child(3) > tr > td.cas-add-program-row.cas-add-program-td.ng-scope > button > i')
    }
    async clickcontinuebutton(page) {
        await page.waitForSelector('#cas-program-search-continue-btn')
        await page.click('#cas-program-search-continue-btn')
    }
    async clicksummarypagecontinuebutton(page){
        await page.click('#cas-content-wrapper > div > div.ng-scope > section > section > div.ng-scope.ng-isolate-scope > header > div.cas-program-selections-actions > button.cas-primary-button-large-next.ng-scope')

    }

    async selectcounty(page, text) {
        await page.type('#personalInfo-biographicInfo-birthInfo-county-listBox', text)
    }

    async selectProgramPlan(page, text){
        console.log('in meth')
        await page.type('select#mandataory-alert-modal-plan-to-enroll-listBox', text)
        
       //const selectElem = await page.$('#mandataory-alert-modal-plan-to-enroll-listBox');
       //await selectElem.type('Winter, 2021');
        await page.click('#errorSavingModal > div > div > div.modal-footer > button');
    }
}


module.exports = addprogrampage;