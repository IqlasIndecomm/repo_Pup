const { AxePuppeteer } = require('@axe-core/puppeteer');
const AxeReports = require('axe-reports');

async function generateResults(page, pageName)
{
    console.log('508 results for '+pageName)
    const resultsChrome = await new AxePuppeteer(page).analyze();
       console.log(resultsChrome);
      var dt = new Date();
      var utcDate = dt.toUTCString();
      var filename = pageName + '508'+ utcDate.replace(":", "").replace(/ /g, "").replace(",", "").substring(0, 16);
      console.log(filename)
      AxeReports.processResults(resultsChrome, 'csv', '508Results/' + filename, true);
}

module.exports = { generateResults};