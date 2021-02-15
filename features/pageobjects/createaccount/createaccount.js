const puppeteer = require("puppeteer")
var random = Math.floor((Math.random() * 1223) + 1);
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const utils = require('../../../utilities/commonUtils')


var CreateAccountButtonInLandingPage = '#cas-content-wrapper > div > div.cas-login-container > div.cas-login-form-container > form > a.cas-login-create-account-link';
var CreateAccountFirstNameTextField = '.cas-new-user-question-block #newUserAccount-name-firstName'
var CreateAccountLastNameTextField = '.cas-new-user-question-block #newUserAccount-name-lastName'


class createaccount {
    async clickcreateaccountbutton(page) {
        await page.waitForSelector(CreateAccountButtonInLandingPage);
        await page.click(CreateAccountButtonInLandingPage)
    }
    async typeFN(page, text) {
        await page.waitForSelector(CreateAccountFirstNameTextField)
        await page.click(CreateAccountFirstNameTextField)
        await page.type(CreateAccountFirstNameTextField, text)
    }
    async typeLN(page, text) {
        await page.waitForSelector(CreateAccountLastNameTextField)
        await page.click(CreateAccountLastNameTextField)
        await page.type(CreateAccountLastNameTextField, text)
    }
    async typeemail(page) {
        await page.type('.cas-fields-container #newUserAccount-contactInfo-email', 'FNLN' + random + '@sync.sendgrid.com')
    }
    async typeconfirmEmail(page) {
        await page.type('.cas-new-user-question-block #newUserAccount-contactInfo-confirmEmail', 'FNLN' + random + '@sync.sendgrid.com')
    }
    async typephone(page) {
        await page.type('#cas-newUserAccount-contactInfo-phone-title', '2012350123')
    }
    async typeusername(page) {
        await page.type('.cas-new-user-question-block #newUserAccount-userNameAndPwd-userName', 'TestUserName' + random)
    }
    async typepassword(page) {
        await page.type('.cas-new-user-question-block #newUserAccount-userNameAndPwd-password', 'Test@123')
    }
    async typeconfirmpassword(page) {
        await page.type('#newUserAccount-userNameAndPwd-confirmPassword', 'Test@123')
    }
    async clicktermscheckbox(page) {
        await page.click('#cas-newUserAccount-termsAndConditions-agreement > div.cas-checkbox-container.ng-scope > div')
    }
    async clickcreateaccountbutton1(page) {
        await page.click('#cas-content-wrapper > div > form > div > div.cas-new-user-submit-button-container > button')
    }
    async checksuccesmessage(page) {
        //await page.waitForXPath('#descriptionaccountCreated > p')
        await page.waitForSelector('#descriptionaccountCreated > p')
        const Message = await page.$eval('#descriptionaccountCreated > p', ele => ele.textContent);
        console.log("CAS Message: " + Message);
        utils.ValidateMessage(Message, "Your account has been successfully created.")
    }
    async clicksuccessmodel(page) {
        const elements = await page.$x('//*[@id="modal-success"]')
        await elements[0].click()
        //await page.waitForSelector('#modal-success')
        //await page.click('#modal-success')
    }

}
module.exports = createaccount;