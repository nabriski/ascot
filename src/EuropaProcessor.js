const zmq = require('zeromq')
  , HashMapClass = Java.type("java.util.concurrent.ConcurrentHashMap")
  , getPort = require('get-port');

EuropaProcessor = {};
EuropaProcessor.init = async (processorPromise,sendPort,receivePort)=>{

  this.exchanges = new HashMapClass();
  this.sendPort = sendPort || await getPort();
  this.receivePort = receivePort || await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.javaProcessor = new EuropaProcessorClass(this.sendPort,this.receivePort,this.exchanges);
  this.processorPromise = processorPromise;
  
  const responder = zmq.socket('pair')
  responder.connect('tcp://0.0.0.0:'+this.sendPort);
  responder.on('message', async (exchangeId)=>{
    console.log("got message")
    const ex = this.exchanges.get(exchangeId.toString());
    const response = await processorPromise(ex);
    const xmitter = zmq.socket('pair')
    xmitter.connect('tcp://0.0.0.0:'+this.receivePort);
    xmitter.send("done");
  });
}

EuropaProcessor.ping = ()=>{
  setTimeout(()=>{
  },500)
}

EuropaProcessor.getJavaProcessor = ()=>{
  return this.javaProcessor;
}

module.exports = EuropaProcessor;