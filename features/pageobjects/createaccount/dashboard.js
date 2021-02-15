const puppeteer = require("puppeteer")
var random = Math.floor((Math.random() * 1223) + 1);
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const utils = require('../../../utilities/commonUtils')

class dashboard {
    async selectfirstquadrant() {
        await page.click('#expandpersonalInfo > div.cas-category-progress.ng-scope > div.cas-category-progress-bar.cas-progress-completion-indicator.cas-personalInfo')
    }
}

module.exports = dashboard;