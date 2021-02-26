const { assert, util } = require("chai");

const CAS_ENV = process.env.CAS_ENV || integration;
const ECO_NAME = process.env.ECO_NAME;
var request = require('request'),
username = "appbuilderApiTest",
password = "311Apiuser@qa",
baseUrl ,
auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

switch(CAS_ENV){
    case 'integration' : baseUrl = "https://appbuilder.int.liaisoncas.com/appbuilder/rest"
                         break;
    case 'staging' : baseUrl = "https://appbuilder.stg.liaisoncas.com/appbuilder/rest"
                         break;
    case 'ecosystem' : baseUrl = "https://appbuilder-"+ECO_NAME+".litest.io/appbuilder/rest"
                         break;
}

function getApiCall(apiUrl) {
   let url = baseUrl + apiUrl;
    return new Promise(function (resolve, reject) {
        request(
            {
                url: url,
                headers: {
                    "Authorization": auth
                }
            },
            function (error, response, body) {
                if(response.statusCode==200 || response.statusCode==201)
                {
                    return resolve(response.statusCode)
                }
                else
                {
                   return reject(response.statusCode)
                }
            }
        );
    });
};



function postApiCall(payload, formid, apiUrl) {
    let url = baseUrl + apiUrl;
    console.log(url)
    return new Promise(function (resolve, reject) {
        request.post(
            {
                url: url,
                headers: {
                    "Authorization": auth,
                    'Content-Type': 'application/json',
                    'x-cycle-content': '{"id":' + formid + '}'
                },
                body: payload,
                json: true
            },
            function (error, response, body) {
                console.log('code ',response.statusCode)
                if(response.statusCode==200 || response.statusCode==201)
                {
                    return resolve(response.statusCode)
                }
                else
                {
                   return reject(response.statusCode)
                }
            }
        );
    });
};

function deleteApiCall(formid, apiUrl) {
    return new Promise(function (resolve, reject) {
        const url = baseUrl + apiUrl;
        request.delete(
            {
                url: url,
                headers: {
                    "Authorization": auth,
                    'Content-Type': 'application/json',
                    'x-cycle-content': '{"id":' + formid + '}'
                }
            },
            function (error, response, body) {
                if(response.statusCode==200 || response.statusCode==201)
                {
                    return resolve(response.statusCode)
                }
                else
                {
                   return reject(response.statusCode)
                }
            }
        );
    });
};

module.exports = { getApiCall, postApiCall, deleteApiCall };