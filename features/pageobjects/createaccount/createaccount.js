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
        console.log('clicking');
        utils.waitfor(10000);
        console.log('waiting');
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

    async clickGDPRQuestionNoRadioButton(page) {
        const elements = await page.$x("//h2[contains(text(),'European Union Data Protection')]/parent::div/div/question-component/div/div/div/fieldset/div/div[2]/div/div[2]/div[1]")
        await elements[0].click()
    }

    async selectTile(page, tile) {
        const element = await page.$x("//a[text()='" + tile + "'][1]")
        await element[0].click()
    }

    async selectQuadrant(page, quadrant) {
        switch (quadrant) {
            case "1": console.log("Click Personal Information")
                const element1 = await page.$x("//*[contains(text(),'Personal')]")
                await element1[0].click()
                break
            case "2": console.log("Click Academic History")
                const element2 = await page.$x("//*[contains(text(),'Academic')]")
                await element2.click()
                break
            case "3": console.log("Click Supporting Information")
                const element3 = await page.$x("//*[contains(text(),'Supporting')]")
                await element3.click()
                break
            case "4": console.log("Click Personal Information")
                const element4 = await page.$x("//*[contains(text(),'Materials')]")
                await element4.click()
                break
        }
    }

}
module.exports = createaccount;