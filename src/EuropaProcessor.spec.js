const t = require('tap')

const EuropaProcessor = require("./EuropaProcessor");
const proc = Object.create(EuropaProcessor);
proc.init(()=>{ return Promise.resolve("hello")},8899,9988);

const zmq = require('zeromq')
const xmitter = zmq.socket('pair')
xmitter.bindSync('tcp://0.0.0.0:8899');
xmitter.send("ready");

const responder = zmq.socket('pair')
responder.bindSync('tcp://0.0.0.0:9988');
responder.on('message', async (reply)=>{
    t.equals(String(reply),"done")
    t.end()
    const process = require('process');
    process.exit(0);
});