const puppeteer = require("puppeteer")
var random = Math.floor((Math.random() * 1223) + 1);
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const utils = require('../../../utilities/commonUtils')

class casSigninpage {
    async typeusernamepassword(page, text1, text2) {
        await page.waitForSelector("#cas-login-field-username")
        await page.type('#cas-login-field-username', text1)
        await page.type('.cas-login-form-container #cas-login-field-password', text2)
    }
    async clicksigninbutton(page){
        await page.waitForSelector('.cas-page-content > .cas-login-container > .cas-login-form-container > .cas-login-form > .cas-login-sign-in-button')
        await page.click('.cas-page-content > .cas-login-container > .cas-login-form-container > .cas-login-form > .cas-login-sign-in-button')
    }
    async clicksignoutbutton(page){
        await page.click('body > div > div > div.cas-application-desktop-container > div:nth-child(1) > header > div > div > div.cas-user-info-container > a.cas-signout-link.ng-binding')
    }
}

module.exports = casSigninpage;