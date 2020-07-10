const zmq = require('zeromq')
  , responder = zmq.socket('rep')
  , HashMapClass = Java.type("java.util.concurrent.ConcurrentHashMap")//<String,Exchange>
  , getPort = require('get-port');

EuropaProcessor = {};
EuropaProcessor.init = async (processor)=>{

  this.exchanges = new HashMapClass();
  this.port = await getPort();
  this.javaProcessor = new Java.type("EuropaProcessor")(this.port,this.exchanges);
  this.processorPromise = processorPromise;
  
  responder.connect('tcp://localhost:'+port);
  responder.on('message', async function(exchangeId) {
    const ex = this.exchanges.get(exchangeId.toString());
    const response = await processor(ex);
  });
  
}

EuropaProcessor.getJavaProcessor = ()=>{
  return this.javaProcessor;
}

module.exports = EuropaProcessor;