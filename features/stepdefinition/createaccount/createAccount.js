const { When, Then, And, Given, AfterAll, After, Status, Scenario, Before } = require("cucumber")
const { prettyPrintJSON } = require("cucumberjs-rest-assured");
const puppeteerFirefox = require('puppeteer-firefox');
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('cucumber');
const { assert, util } = require("chai");
//const { expect } = require("jasmine");
var chai = require('chai');
var expect = chai.expect;
const { AxePuppeteer } = require('@axe-core/puppeteer');
const AxeReports = require('axe-reports');
const fs = require('fs') 
setDefaultTimeout(60 * 1000);
//var random = Math.floor((Math.random() * 1223) + 1);
const ScreenshotTester = require('puppeteer-screenshot-tester')
//const tester = ScreenshotTester()
var mssql = require('mssql');
var MobileDetect = require('mobile-detect');


const CAS_ENV = process.env.CAS_ENV || stage;
var testenv;

const ECO_NAME = process.env.ECO_NAME;
var testeco;

const MOBILE_DEVICE = process.env.MOBILE_DEVICE;
var testmobiledevice;

const TAB_DEVICE = process.env.TAB_DEVICE;
var testtabdevice;

const CHECK_508 = process.env.CHECK_508 || false;
var check508

//var navigator;
/* global.navigator = {
    userAgent: '',
  } */

  const CreateAccount = require('../../pageobjects/createaccount/createaccount');
  var createaccount = new CreateAccount();
  
  const casSigninpage = require('../../pageobjects/createaccount/casSigninpage');
  var landingpage = new casSigninpage();
  
  const addprogrampage = require('../../pageobjects/programselection/addprogrampage')
  var addprogram = new addprogrampage();
  
  const biographicInfo = require('../../pageobjects/personalinformation/biographicinformation/biographicinfotile')
  var biographictile = new biographicInfo();
  
  const mydashboard = require('../../pageobjects/createaccount/dashboard')
  var dashboard = new mydashboard();

  const createaccountdata = require('../../../testdata/datafiles/createaccountdata')

  const personalinformationessaystiledata = require('../../../testdata/datafiles/personalinformationessaystiledata')

  const casformid = require('../../../testdata/datafiles/casformid')

  //var createAccountData = new createaccountdata();
  
var url = require('../../../configuration/urls')

const check = require('../../../configuration/508check')

var api = require('../../../api/apitest')

var utils = require('../../../utilities/commonUtils');

var db = require('../../../configuration/database');
const { deepStrictEqual } = require("assert");



//const app = require('http').createServer();







//When('Click on SignIn button', async function () {
   // await landingpage.clicksigninbutton(page);
//});


// Then('Verify the error message for login', async function () {
//     await page.waitForSelector('#errorMessage > div > ul > li:nth-child(1)')
//     const Message = await page.$eval('#errorMessage > div > ul > li:nth-child(1)', ele => ele.textContent);
//     console.log("Heading text: " + Message);
//     utils.ValidateMessage(Message, 'Incorrect username or password')
// });

// Given("UserName and Password is provided", async function () {
//     await landingpage.typeusernamepassword(page, 'sahni.aashna', 'Test@123');
// });

When('SignIn button is clicked', async function () {
    await landingpage.clicksigninbutton(page);
    utils.waitfor(5000);
});

Then('Validate DashBoard Page and print CASID', async function () {
    await page.waitForSelector('body > div > div > div.cas-application-desktop-container > div:nth-child(1) > header > div > div > div.cas-user-info-container > div > span')
    const Message = await page.$eval('body > div > div > div.cas-application-desktop-container > div:nth-child(1) > header > div > div > div.cas-user-info-container > div > span', ele => ele.textContent);
    console.log("CAS ID is: " + Message);
    console.log(page.url());
    console.log(page.url().includes('/dashboard'));
    assert.isTrue(utils.containsTextMessage(page.url(), '/dashboard'), "Text is not present");
    
});

Then('SignOut from App Portal', async function () {
    await landingpage.clicksignoutbutton(page);
});

Given('Create Account button is clicked', async function () {
    utils.waitfor(10000)
    await createaccount.clickcreateaccountbutton(page);
    if(CHECK_508=='true')
      {
        await check.generateResults(page, 'CreateAccountPage');
      }
    //await page.waitForSelector('#cas-content-wrapper > div > div.cas-login-container > div.cas-login-form-container > form > a.cas-login-create-account-link')
    //await page.click('#cas-content-wrapper > div > div.cas-login-container > div.cas-login-form-container > form > a.cas-login-create-account-link')
});

When('User Account is created', async function () {
    utils.waitfor(10000)
    await createaccount.typeFN(page, 'TestFirstName')
    await createaccount.typeLN(page, 'TestLastName')
    await createaccount.typeemail(page)
    await createaccount.typeconfirmEmail(page)
    await createaccount.typephone(page)
    await createaccount.typeusername(page)
    await createaccount.typepassword(page)
    await createaccount.typeconfirmpassword(page)
    await createaccount.clicktermscheckbox(page)
    try{
        await createaccount.clickGDPRQuestionNoRadioButton(page)
    }
    catch(error)
    {
        console.log('European Question is not displayed/Applicable');
    }
    await createaccount.clickcreateaccountbutton1(page)
    utils.waitfor(5000)
    await createaccount.checksuccesmessage(page)
    await createaccount.clicksuccessmodel(page)
    utils.waitfor(5000)
});

Then('Select an program in Add Program page and continue to DashBoard', async function () {
    utils.sleep(15000)
    try{
        await addprogram.selectProgramPlan(page, 'Winter, 2021')
    }
    catch(error)
    {
        console.log('Program Plan pop up not present')
    }
    console.log('clicking first program')
    utils.sleep(3000)
    await addprogram.clickfirstprogram(page);
    utils.sleep(3000)
    await addprogram.clickcontinuebutton(page);
    utils.sleep(5000)
    //var Message = utils.gettext(page, '#cas-content-wrapper > div > div.ng-scope > section > section > div.ng-scope.ng-isolate-scope > header > div.cas-program-selections-total-fees-container.ng-scope > dl > dd')
    const Message = await page.$eval('#cas-content-wrapper > div > div.ng-scope > section > section > div.ng-scope.ng-isolate-scope > header > div.cas-program-selections-total-fees-container.ng-scope > dl > dd', ele => ele.textContent);
    console.log("Fee is: " + Message.trim()); 
    assert.isTrue(utils.ValidateMessage(Message.trim(), createaccountdata.AACOMAS_PROGRAM_FEE), "Text do not match");

    await addprogram.clicksummarypagecontinuebutton(page);
    //await page.click('#cas-content-wrapper > div > div.ng-scope > section > section > div.ng-scope.ng-isolate-scope > header > div.cas-program-selections-actions > button.cas-primary-button-large-next.ng-scope')
});

Then('Complete {string} tile', async function (string) {
    console.log('Current Tile Name is ' + string)
    //await dashboard.selectfirstquadrant(page)
    //await page.click('#expandpersonalInfo > div.cas-category-progress.ng-scope > div.cas-category-progress-bar.cas-progress-completion-indicator.cas-personalInfo')
    utils.sleep(20000)
    /* if (string.trim() == 'Biographic Information') {
        await biographictile.clickbiographytile(page); */
        //await page.click('#collapse-personalInfo > section > ul > li:nth-child(1)')
        utils.sleep(15000)
        await biographictile.clickmalesexradiobuttob(page);
        //await page.click('#personalInfo-biographicInfo-gender-gender-male > div.cas-radio-container > div')
        await biographictile.typeDOB(page, '09/17/1995')
        //await page.click('#personalInfo-biographicInfo-birthInfo-dob > div.md-datepicker-input-container > input')
        //await page.type('#personalInfo-biographicInfo-birthInfo-dob > div.md-datepicker-input-container > input', '09/17/1995')
        await biographictile.selectcountry(page, 'United');
        //await page.type('#personalInfo-biographicInfo-birthInfo-country-listBox', 'United')
        await biographictile.selectcity(page, 'New York');
        //await page.type('#personalInfo-birthInfo-city', 'New York')
        await biographictile.selectstate(page, 'Alabama');
        //await page.type('#personalInfo-biographicInfo-birthInfo-state-listBox', 'Alabama')
        await biographictile.selectcounty(page, 'Autauga County');
        //await page.type('#personalInfo-biographicInfo-birthInfo-county-listBox', 'Autauga')
        utils.sleep(15000)
        await biographictile.clicksaveandcontinue(page)
        //await page.click('#cas-content-wrapper > section > div.cas-container.cas-section-content-container.ng-scope > div > div > div > form > div.cas-save-and-continue-button-container > button > span')
        utils.sleep(5000)
   /*  }

    else if (string.trim() == 'Contact Information')
        await page.click('#collapse-personalInfo > section > ul > li:nth-child(2)') */
});

Then('Count the results', async function () {
    var linkTexts = await page.$$eval(".plan-features a",
     elements => elements.map(item => item.textContent))
    // prints a array of text
    console.log(linkTexts.length)
    //uncomment close statement if you want
    //await this.browser.close()
    //await browser.close()

   });


   When('Click on SignIn button', async function () {
    await landingpage.clicksigninbutton(page);
});
Then('Verify the error message for login', async function () {
    await page.waitForSelector('#errorMessage > div > ul > li:nth-child(1)')
    const Message = await page.$eval('#errorMessage > div > ul > li:nth-child(1)', ele => ele.textContent);
    console.log("Heading text: " + Message);
    utils.ValidateMessage(Message, 'Incorrect username or password')
});
Given("UserName and Password is provided", async function () {
    await landingpage.typeusernamepassword(page, 'aashnasahni', 'Test@123');
});

Then('add custom tile', async function (tile) {
    console.log('stepdefinition: add custom tile')
    var value = tile.rows();
    switch(value[0][0]){
        case 'Essays' : query = personalinformationessaystiledata.GET_ESSAYS_APPLICATIONFORMSUBSECTIONID_AACOMAS;
                        break;
    }
   var result = await db.executeQueryWithReturn(query);
    var userData = result;
    var newData = JSON.parse(JSON.stringify(userData));
   if(newData.recordsets[0].length=='0')
   {
    var formidquery = casformid.GET_FORMID_AACOMAS;
    var result = await db.executeQueryWithReturn(formidquery);
    var userData = result;
    var newData = JSON.parse(JSON.stringify(userData));
    var formid =  newData.recordset[0].Id;
    var apiurl = "/applicationFormSubSections";
    var payload = createaccountdata.CREATE_TILE_PAYLOAD;
    await api.postApiCall(payload, formid, apiurl)
     .then(function(data) {
        console.log('POST API Success!!')
    }, function(err) {
        console.log('POST API Failed!!')
    });
    
}
});

Then('delete custom tile', async function (tile) {
    console.log('stepdefinition: delete custom tile')
    var value = tile.rows();
    var  tile, query, applicationformsubsectionid;
    switch(value[0][0]){
        case 'Essays' : query = personalinformationessaystiledata.GET_ESSAYS_APPLICATIONFORMSUBSECTIONID_AACOMAS;
                        break;
    }
    var result = await db.executeQueryWithReturn(query);
    var userData = result;
    var newData = JSON.parse(JSON.stringify(userData));
    if(newData.recordsets[0].length!='0')
    {
    applicationformsubsectionid =  newData.recordset[0].Id;
    var apiurl = "/applicationFormSubSections/"+applicationformsubsectionid;
    var formidquery = casformid.GET_FORMID_AACOMAS;
    var result1 = await db.executeQueryWithReturn(formidquery);
    var userData1 = result1;
    var newData1 = JSON.parse(JSON.stringify(userData1));
    var formid =  newData1.recordset[0].Id;
     await api.deleteApiCall(formid, apiurl)
      .then(function(data) {
        console.log('DELETE API Success!!')
    }, function(err) {
        console.log('DELETE API Failed!!')
    });
    }
});

Then('i print text', async function (table) {
    var s = table.rows();
    console.log("text: ");
    s.forEach(function (arrayItem) {
        console.log(arrayItem);
    });
});

 Then('i execute query with return', async function (text) {
    var query;
    var value = text.rows();
    console.log("printing "+value[0][0]);
    switch(value[0][0]){
        case "SELECT_BUCOM_PROGRAMS" : query = createaccountdata.SELECT_BUCOM_PROGRAMS;
                                             break;

    }
    console.log(query)
    var result = await db.executeQueryWithReturn(query);
    console.log('1111printing result' ,result);
    var userData = result;
    var newData = JSON.parse(JSON.stringify(userData));
    console.log('printing all records',newData.recordset);
    console.log('First program name is',newData.recordset[0].ProgramName);
    console.log('printing list of programs:')
    var i = 0;
     newData.recordset.forEach(function (value) {
      console.log(newData.recordset[i].ProgramName);
      i++;
});

}); 

Then('i execute query without return', async function (text) {
    var query;
    var value = text.rows();
    console.log("printing "+value[0][0]);
    switch(value[0][0]){
        case "ACTIVATE_BUCOM_PROGRAMS" : query = createaccountdata.ACTIVATE_BUCOM_PROGRAMS;
                                             break;

    }
    console.log(query)
    await db.executeQueryWithoutReturn(query);

}); 


Then('Select tile {string}', async function (string) {
    console.log('Tile Name is ' + string)
    await createaccount.selectTile(page, string)
    if(CHECK_508=='true')
      {
        await check.generateResults(page, string.replace(/ /g, ""));
      }
 });

 Then('Select quadrant {string}', async function (string) {
    await createaccount.selectQuadrant(page, string)
 });

 


 