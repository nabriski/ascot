const t = require('tap')
const ProcessorWrapper = require("./ProcessorWrapper");
const request = require("superagent");

const start = async()=>{
    let result = "koko";
    const port = 9988;
    const wrapper = Object.create(ProcessorWrapper);
    await wrapper.init(async ()=>{result="moko"},port);


    const fakeKey = "123";
    const resp = await request.get(`http://localhost:${port}/${fakeKey}`).accept('application/json');
    const reply = resp.text;
    t.equals(reply,"done")
    t.equals(result,"moko")
    t.end()
    const process = require('process');
    process.exit(0);
}

start();