const zmq = require('zeromq')
  , HashMapClass = Java.type("java.util.concurrent.ConcurrentHashMap")
  , getPort = require('get-port');

EuropaProcessor = {};
EuropaProcessor.init = async (processor)=>{

  this.exchanges = new HashMapClass();
  this.sendPort = await getPort();
  this.receivePort = await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.javaProcessor = new EuropaProcessorClass(this.sendPort,this.receivePort,this.exchanges);
  this.processorPromise = processorPromise;
  
  const responder = zmq.socket('pair')
  responder.connect('tcp://*:'+this.sendPort);
  responder.on('message', async (exchangeId)=>{
    const ex = this.exchanges.get(exchangeId.toString());
    const response = await processor(ex);
    const xmitter = zmq.socket('pair')
    xmitter.connect('tcp://*:'+this.receivePort);
    xmitter.send("done");
  });
  
}

EuropaProcessor.getJavaProcessor = ()=>{
  return this.javaProcessor;
}

module.exports = EuropaProcessor;