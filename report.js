const reporter = require("cucumber-html-reporter")
const options = {
     theme: 'bootstrap',
     jsonFile: 'cucumber-report.json',
     output: 'cucumber-html-result.html',
     reportSuiteAsScenarios: true,
     scenarioTimestamp: true,
     launchReport: true,
     screenshotsDirectory: 'screenshots/',
     storeScreenshots: false
}
reporter.generate(options)