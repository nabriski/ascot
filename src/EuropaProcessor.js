const zmq = require('zeromq')
  , responder = zmq.socket('rep')
  , HashMapClass = Java.type("java.util.concurrent.ConcurrentHashMap");//<String,Exchange>

EuropaProcessor = {};
EuropaProcessor.init = (processor)=>{

  this.exchanges = new HashMapClass();
  this.port = //generate random port;
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