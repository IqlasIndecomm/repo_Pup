
const { When, Then, And, Given, AfterAll, After, Status, Scenario, Before } = require("cucumber")
const { prettyPrintJSON } = require("cucumberjs-rest-assured");
const puppeteerFirefox = require('puppeteer-firefox');
const puppeteerEdge = require('puppeteer-edge');
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


const CAS_ENV = process.env.CAS_ENV || integration;
var testenv;

const ECO_NAME = process.env.ECO_NAME;
var testeco;

const MOBILE_DEVICE = process.env.MOBILE_DEVICE || IPHONE_12_PRO_MAX_CURRENT_VERSION_USERAGENT;
var testmobiledevice;

const TAB_DEVICE = process.env.TAB_DEVICE || IPAD_PRO_PREVIOUS_VERSION_USERAGENT;
var testtabdevice;

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

const useragent = require('../../../testdata/datafiles/useragent')

Before(async function (scenario) {
  //testenv = '${CAS_ENV}';
  console.log(`Scenario: ${JSON.stringify(scenario.pickle.name)}  Started in ${CAS_ENV} environment`);
  testenv = CAS_ENV;
  testeco = ECO_NAME;
  testmobiledevice = MOBILE_DEVICE;
  testtabdevice = TAB_DEVICE
  console.log(testeco);
});

Then('The browser is closed', async function () {
  await browser.close()
});


/* Given("The browser is open", async function () {
    browser = await puppeteer.launch({
         headless: false, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized']
    })
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 0, height: 0 })
}) */

When('Open the {string} Applicant page {string}', async function (cas, device) {

  console.log('Cas is ' + cas)
  console.log('device is ' + device)

  switch (device) {
    case "desktop-chrome":
      console.log("desktop-chrome")

      browser = await puppeteer.launch({
        headless: false, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized']
      })
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.setViewport({ width: 0, height: 0 })


      await page.goto(url.getURL(testenv, cas, testeco), { waitUntil: 'networkidle0' })

      const testerDesktopChrome = await ScreenshotTester(0.8, false, false, [], {
        transparency: 0.5
      })
      console.log('screenshot check')
      const resultDesktopChrome = await testerDesktopChrome(page, '../../screenshottester/SignInPageDesktopChrome', {
        fullPage: true,
      })

      expect(resultDesktopChrome).to.be.true;

      //Below 2 lines is for getting the accessibility
      //  const snapshot = await page.accessibility.snapshot();
      //console.log(snapshot);

      //508 check
      console.log('508 results')
      const resultsChrome = await new AxePuppeteer(page).analyze();
      // console.log(results);
      var dt = new Date();
      var utcDate = dt.toUTCString();
      var filename = 'SignInPage508' + utcDate.replace(":", "").replace(/ /g, "").replace(",", "").substring(0, 16);
      console.log(filename)
      AxeReports.processResults(resultsChrome, 'csv', '508Results/' + filename, true);
      break;

    case "desktop-firefox":
      console.log("desktop-firefox")

      browser = await puppeteerFirefox.launch({
        headless: false, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized']
      })
      page = await browser.newPage();
      // await page.setDefaultNavigationTimeout(0);
      // await page.setViewport({ width: 0, height: 0 })

      await page.goto(url.getURL(testenv, cas, testeco))

      //Below 2 lines is for getting the accessibility
      //  const snapshot = await page.accessibility.snapshot();
      //console.log(snapshot);

      //508 check
      await page.setViewport({ width: 1400, height: 900 })

      const testerDesktopFirefox = await ScreenshotTester(0.8, false, false, [], {
        transparency: 0.5
      })
      console.log('screenshot check')
      const resultDesktopFirefox = await testerDesktopFirefox(page, '../../screenshottester/SignInPageDesktopFirefox', {
        fullPage: true,
      })

      expect(resultDesktopFirefox).to.be.true;

      //not supported on ff
      /* console.log('508 results')
       const resultsFirefox = await new AxePuppeteer(page).analyze();
     console.log(resultsFirefox);
       var dtf = new Date();
       var utcDatef = dtf.toUTCString();
      var filenamef = 'SignInPage508FireFox'+utcDatef.replace(":", "").replace(/ /g, "").replace(",", "").substring(0,16);
       console.log(filename)
      AxeReports.processResults(resultsFirefox, 'csv', '508Results/'+filenamef, true); */
      break;


    //uses chromium similar to chrome
    /* case "desktop-edge":
      console.log("desktop-edge")
 
      browser = await puppeteerEdge.launch({
        headless: false, ignoreHTTPSErrors: true, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized'],
      })
      page = await browser.newPage();
 
      await page.goto(url.getURL(testenv, cas, testeco), { waitUntil: 'networkidle0' })

      await page.setViewport({ width: 1400, height: 900 })
 
      const testerDesktopEdge = await ScreenshotTester(0.8, false, false, [], {
        transparency: 0.5
      })
      break;  */


    case "mobile":
      console.log("mobile")
      console.log(testmobiledevice)
      var agent, device;
      browser = await puppeteer.launch({
        headless: false, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized']
      })
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      //await page.setViewport({ width: 0, height: 0 })


      await page.goto(url.getURL(testenv, cas, testeco), { waitUntil: 'networkidle0' })
      // await page.goto(url.getURL(testenv, 'BuCom', testeco))
      switch (testmobiledevice) {
        case "IPHONE_12_PRO_MAX_CURRENT_VERSION_USERAGENT": agent = useragent.IPHONE_12_PRO_MAX_CURRENT_VERSION_USERAGENT
          device = useragent.IPHONE_12_PRO_MAX_DEVICE
          break;
        case "IPHONE_12_PRO_MAX_PREVIOUS_VERSION_USERAGENT": agent = useragent.IPHONE_12_PRO_MAX_PREVIOUS_VERSION_USERAGENT
          device = useragent.IPHONE_12_PRO_MAX_DEVICE
          break;
        case "SAMSUNG_GALAXY_S20_USERAGENT": agent = useragent.SAMSUNG_GALAXY_S20_USERAGENT
          device = useragent.SAMSUNG_GALAXY_S20_DEVICE
          break;
        case "SAMSUNG_GALAXY_S10_USERAGENT": agent = useragent.SAMSUNG_GALAXY_S10_USERAGENT
          device = useragent.SAMSUNG_GALAXY_S10_DEVICE
          break;
      }
      console.log('outside switch', agent, device)
      await page.setUserAgent(agent);
      const mobile = puppeteer.devices[device]
      page.emulate(mobile)
      await page.waitFor(5000);

      break;

    case "tablet":
      console.log("tablet")
      browser = await puppeteer.launch({
        headless: false, ignoreHTTPSErrors: true, slowMo: 25, args: ['--start-maximized']
      })
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.setViewport({ width: 0, height: 0 })


      await page.goto(url.getURL(testenv, cas, testeco), { waitUntil: 'networkidle0' })

      switch (testtabdevice) {
        case "IPAD_PRO_CURRENT_VERSION_USERAGENT": agent = useragent.IPAD_PRO_CURRENT_VERSION_USERAGENT
        device = useragent.IPAD_PRO_DEVICE
        break;
      case "IPAD_PRO_PREVIOUS_VERSION_USERAGENT": agent = useragent.IPAD_PRO_PREVIOUS_VERSION_USERAGENT
        device = useragent.IPAD_PRO_DEVICE
        break;
      }
      console.log('outside switch', agent, device)
      // await page.goto(url.getURL(testenv, 'BuCom', testeco))

      await page.setUserAgent(agent);
      const tablet = puppeteer.devices[device]
      await page.emulate(tablet)
      await page.waitFor(15000);
      /* const testerTablet = await ScreenshotTester(0.8, false, false, [], {
        transparency: 0.5
      })
      console.log('screenshot check')
      const resultTablet = await testerTablet(page, '../../screenshottester/SignInPageTablet', {
        fullPage: true,
      }) */

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
  // await browser.close()
  /*if(scenario.result.status=== Status.SKIPPED){
      const screenShotFail= await page.screenshot({fullPage: true });
      this.attach(screenShotFail, "image/png");
  }*/
});