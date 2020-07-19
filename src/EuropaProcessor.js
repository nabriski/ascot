const zmq = require('zeromq')
  , getPort = require('get-port');

EuropaProcessor = {};
EuropaProcessor.init = async (javaProcessor,processorPromise,sendPort,receivePort)=>{

  this.sendPort = sendPort || await getPort();
  this.receivePort = receivePort || await getPort();
//  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
//  this.javaProcessor = new EuropaProcessorClass(this.sendPort,this.receivePort);
  this.javaProcessor = javaProcessor;
  this.processorPromise = processorPromise;
  
  const responder = zmq.socket('pair')
  responder.bindSync('tcp://0.0.0.0:'+this.sendPort);
  responder.on('message', async (exchangeId)=>{
    const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
    const ex = EuropaProcessorClass.exchanges.get(String(exchangeId));
    await processorPromise(ex);
    const xmitter = zmq.socket('pair')
    xmitter.connect('tcp://0.0.0.0:'+this.receivePort);
    xmitter.send("done");
  });
}

module.exports = EuropaProcessor;