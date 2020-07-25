const t = require('tap')
const AggregationStrategyWrapper = require("./AggregationStrategyWrapper");
const request = require("superagent");
const chai = require("chai");
chai.use(require('chai-uuid'));
const expect = chai.expect;

const start = async()=>{
    let result = "koko";
    const port = 9989;
    const wrapper = Object.create(AggregationStrategyWrapper);
    await wrapper.init(async ()=>{result="moko"},port);


    const fakeKey1 = "123";
    const fakeKey2 = "456";
    const resp = await request.get(`http://localhost:${port}/${fakeKey1}/${fakeKey2}`).accept('application/json');
    const reply = resp.text;
    expect(reply).to.be.a.uuid();
    t.equals(result,"moko")
    t.end()
    const process = require('process');
    process.exit(0);
}

start();