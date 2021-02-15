const puppeteer = require("puppeteer")
var random = Math.floor((Math.random() * 1223) + 1);
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const utils = require('../../../../utilities/commonUtils');

class biographicInfo {
    async clickbiographytile(page) {
        await page.click('#collapse-personalInfo > section > ul > li:nth-child(1)')
    }
    async clickmalesexradiobuttob(page) {
        await page.click('#personalInfo-biographicInfo-gender-gender-male > div.cas-radio-container > div')
    }
    async typeDOB(page, text) {
        await page.click('#personalInfo-biographicInfo-birthInfo-dob > div.md-datepicker-input-container > input')
        await page.type('#personalInfo-biographicInfo-birthInfo-dob > div.md-datepicker-input-container > input', text)
    }
    async selectcountry(page, text) {
        await page.type('#personalInfo-biographicInfo-birthInfo-country-listBox', text)
    }
    async selectcity(page, text) {
        await page.type('#personalInfo-birthInfo-city', text)
    }
    async selectstate(page, text) {
        await page.type('#personalInfo-biographicInfo-birthInfo-state-listBox', text)
    }
    async selectcounty(page, text) {
        await page.type('#personalInfo-biographicInfo-birthInfo-county-listBox', text)
    }

    async clicksaveandcontinue(page) {
        await page.click('#cas-content-wrapper > section > div.cas-container.cas-section-content-container.ng-scope > div > div > div > form > div.cas-save-and-continue-button-container > button > span')
    }
}

module.exports = biographicInfo;