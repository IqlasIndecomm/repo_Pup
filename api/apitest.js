const request = require("supertest")("https://calstate.stg.liaisoncas.com/applicant-ux/api");
const expect = require("chai").expect;

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