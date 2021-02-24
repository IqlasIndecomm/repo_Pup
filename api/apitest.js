const request = require("supertest")("https://calstate.stg.liaisoncas.com/applicant-ux/api");
const expect = require("chai").expect;
//const { prettyPrintJSON } = require("cucumberjs-rest-assured");
//const RestAssured = require("cucumberjs-rest-assured");
const https = require('https');

// describe("GET phonetypes", function () {
//   it("Get phone types", async function () {
//     const response = await request.get("/lookup/phoneTypes");

//     expect(response.status).to.eql(200);
//    // expect(response.body.data.len).to.eql(4);
//     console.log(response.body)

//     const attributes = response.body.data.attributes;
//     expect(attributes).to.include.keys("id", "code", "text", "sortIdx", "hidden");
//     expect(attributes.hidden).eql(false);
//     //expect(response.body.data.length).to.eql(30);
//   });
// });

const CAS_ENV = process.env.CAS_ENV || integration;

async function addDataAPIPostCall (payload, formid, apiurl, code){
    console.log('checking env',CAS_ENV)
    /* RestAssured.baseURI = "https://appbuilder.int.liaisoncas.com";
    given()
		.log().all()
		.contentType(ContentType.JSON)
		.auth().preemptive().basic("appbuilderApiTest", "311Apiuser@qa")
		.body(payload)
		.when()
		.header("x-cycle-content", "{\"id\":"+formid+"}")
		.post(apiurl)
		.then()
		.assertThat().statusCode(code).extract().response(); */
         /* fetch('http://example.com/movies.json')
            .then(response => response.json())
            .then(data => console.log(data)); */

 /*  https.    get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';
 
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    console.log(JSON.parse(chunk).explanation);
    //data += chunk;
  }); 

  
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); */

//const https = require('https')
/* console.log('chk',apiurl+formid)
const options = {
  hostname: 'https://appbuilder.int.liaisoncas.com',
  port: 1443,
  path: 'apiurl+formid',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + new Buffer('appbuilderApiTest' + ':' + '311Apiuser@qa').toString('base64')
 },
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end() */
request.post('https://appbuilder.int.liaisoncas.com'+apiurl+formid)
    .set('Content-Type', 'application/json')
    .send(payload)
   // .then(callback)
    .then(res => {
        alert('yay got ' + JSON.stringify(res.body));
     })
    .catch(errorCallback)

}


module.exports = { addDataAPIPostCall };