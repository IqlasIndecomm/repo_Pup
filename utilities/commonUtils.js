const { assert } = require("chai");
var { setDefaultTimeout } = require('cucumber');

function ValidateMessage(Message, text) {
    console.log("Text1 is " + Message);
    console.log("Text2 is " + text);
    return Message===text;
}

function containsTextMessage(Message, text) {
    console.log("Text1 is " + Message);
    console.log("Text2 is " + text);
    return Message.includes(text);
    
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function waitfor(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function gettext(page, locator) {
    page.waitForSelector(locator)
    const Message = await page.$eval(locator, ele => ele.textContent);
    return Message;
}

module.exports = { ValidateMessage, containsTextMessage, sleep, waitfor, gettext };