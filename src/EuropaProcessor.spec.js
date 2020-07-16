const EuropaProcessor = require("./EuropaProcessor");
const proc = Object.create(EuropaProcessor);
proc.init(()=>{ return Promise.resolve("hello")},8899,9988);

const zmq = require('zeromq')
const xmitter = zmq.socket('pair')
xmitter.bindSync('tcp://0.0.0.0:8899');
xmitter.send("ready");

const responder = zmq.socket('pair')
responder.bindSync('tcp://0.0.0.0:9988');
responder.on('message', async (exchangeId)=>{
    console.log(String(exchangeId));
});