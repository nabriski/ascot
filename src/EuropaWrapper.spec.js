const t = require('tap')
const EuropaWrapper = require("./EuropaWrapper");

const start = async()=>{
    let result = "koko";
    const wrapper = Object.create(EuropaWrapper);
    await wrapper.init(async ()=>{result="moko"});

    const zmq = require('zeromq')
    const xmitter = zmq.socket('pair')
    xmitter.connect('tcp://0.0.0.0:'+wrapper.getSendPort());
    xmitter.send("ready");

    const responder = zmq.socket('pair')
    responder.bindSync('tcp://0.0.0.0:'+wrapper.getReceivePort());
    responder.on('message', async (reply)=>{
        t.equals(String(reply),"done")
        t.equals(result,"moko")
        t.end()
        const process = require('process');
        process.exit(0);
    });
}

start();