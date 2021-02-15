
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

var MobileDetect = require('mobile-detect');


const CAS_ENV = process.env.CAS_ENV || stage;
var testenv;

const ecoSystemName = process.env.ecoSystemName;
var testeco;

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

var url = require('../../../configuration/urls')

var utils = require('../../../utilities/commonUtils');

Before(async function (scenario) {
    //testenv = '${CAS_ENV}';
    console.log(`Scenario: ${JSON.stringify(scenario.pickle.name)}  Started in ${CAS_ENV} environment`);
    testenv = CAS_ENV;
    testeco = ecoSystemName;
    console.log(testeco);
});

Then('The browser is closed', async function () {
    await browser.close()
});


Given("The browser is open", async function () {
    browser = await puppeteer.launch({
         headless: false, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized']
    })
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 0, height: 0 })
})

When('Open the {string} Applicant page {string}', async function (cas, device) {
    console.log('Cas is ' + cas)
    console.log('device is ' + device)
    if (cas.trim() == 'BuCom') {
      console.log("inif");
        await page.goto(url.getURL(testenv, 'BuCom', testeco), { waitUntil: 'networkidle0' })
        // await page.goto(url.getURL(testenv, 'BuCom', testeco))
        }
    switch(device){
        case "desktop-chrome":
            console.log("desktop")    
            const testerDesktop = await ScreenshotTester(0.8, false, false, [], {
                transparency: 0.5
              })
              console.log('screenshot check')
              const resultDesktop = await testerDesktop(page, '../../screenshottester/SignInPageDesktop', {
                fullPage: true,
              })
        
              expect(resultDesktop).to.be.true;

               //Below 2 lines is for getting the accessibility
               //  const snapshot = await page.accessibility.snapshot();
               //console.log(snapshot);
    
               //508 check
              console.log('508 results')
              const results = await new AxePuppeteer(page).analyze();
            // console.log(results);
               var dt = new Date();
               var utcDate = dt.toUTCString();
              var filename = 'SignInPage508'+utcDate.replace(":", "").replace(/ /g, "").replace(",", "").substring(0,16);
               console.log(filename)
              AxeReports.processResults(results, 'csv', '508Results/'+filename, true);
        break;
        case "mobile":
            console.log("mobile")  
            await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
            const mobile = puppeteer.devices['iPhone X']
            page.emulate(mobile)
            await page.waitFor(5000);
            const testerMobile = await ScreenshotTester(0.8, false, false, [], {
                transparency: 0.5,
              })
              console.log('screenshot check')
              const resultMobile = await testerMobile(page, '../../screenshottester/SignInPageMobile', {
                fullPage: true,
              })
        
              expect(resultMobile).to.be.true; 
        break;
        case "tablet":
            console.log("tablet")
           
            await page.setUserAgent('Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10');
            const tablet = puppeteer.devices['iPad landscape']
            await page.emulate(tablet)
            await page.waitFor(10000);
            const testerTablet = await ScreenshotTester(0.8, false, false, [], {
                transparency: 0.5
              })
              console.log('screenshot check')
              const resultTablet = await testerTablet(page, '../../screenshottester/SignInPageTablet', {
                fullPage: true,
              })
        
              expect(resultTablet).to.be.true;
        break;

    }
    //console.log('device is ' + device)
    //await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    //var md = new MobileDetect('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    //var md = new MobileDetect();
    //tab
   // var md = new MobileDetect('Mozilla/5.0 (Linux; Android 6.0.1; SGP771 Build/32.2.A.0.253; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36');
    //await page.setViewport({ width: 375, height: 812 });

  // const mobile = puppeteer.devices['iPhone X']
    //    page.emulate(mobile)
   // const tablet = puppeteer.devices['iPhone 6']
  //  await page.emulate(tablet)

    // await page.setUserAgent('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148')
    
   
    //"https://bu-com.stg.liaisoncas.com/applicant-ux/#/login")//, { waitUntil: 'networkidle0' })
    //console.log('%npm_config_myEnv%');
    //console.log(securityDetails.validFrom());



    /* await page.screenshot({path: 'buddy-screenshot.png'});
     const userAgent = await page.evaluate(() => navigator.userAgent );
    console.log('print user agent'+userAgent);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot()({
    failureThresholdType:'pixel',
    failureThreshold:500});  */

    
     //console.log("ua is"+md.userAgent(), md.tablet(), md.phone())
     //console.log(page)  
    
})

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenShotFail = await page.screenshot({ fullPage: true });
        this.attach(screenShotFail, "image/png");
    }
    await browser.close()
    /*if(scenario.result.status=== Status.SKIPPED){
        const screenShotFail= await page.screenshot({fullPage: true });
        this.attach(screenShotFail, "image/png");
    }*/
});