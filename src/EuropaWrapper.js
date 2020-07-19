const zmq = require('zeromq')
  , getPort = require('get-port');

EuropaWrapper = {};
EuropaWrapper.init = async (processorPromise)=>{

  this.sendPort =     await getPort();
  this.receivePort =  await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.processor = new EuropaProcessorClass(this.sendPort,this.receivePort);
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

EuropaWrapper.getSendPort = ()=>{
  return this.sendPort;
}

EuropaWrapper.getReceivePort = ()=>{
  return this.receivePort;
}

EuropaWrapper.processor = ()=>{
  return this.processor.processor()
}

module.exports = EuropaWrapper;