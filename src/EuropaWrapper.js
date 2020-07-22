const getPort = require('get-port');
const express = require('express')


EuropaWrapper = {};
EuropaWrapper.init = async (processorPromise)=>{

  this.app = express()
  const port =     await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.processor = new EuropaProcessorClass(port);
  this.processorPromise = processorPromise;

  this.app.get('/:key', async(req, res) => {
    const ex = EuropaProcessorClass.exchanges.get(req.params.key);
    await processorPromise(ex);
    res.end('done')
  })
  this.app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
  /*this.receivePort =  await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.processor = new EuropaProcessorClass(this.sendPort,this.receivePort);
  this.processorPromise = processorPromise;
  const responder = zmq.socket('pair')
  responder.bindSync('tcp://0.0.0.0:'+this.sendPort);
  responder.on('message', async (exchangeId)=>{
    console.log("got message!")
    const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
    const ex = EuropaProcessorClass.exchanges.get(String(exchangeId));
    await processorPromise(ex);
    const xmitter = zmq.socket('pair')
    xmitter.connect('tcp://0.0.0.0:'+this.receivePort);
    xmitter.send("done");
    console.log("sent done!")
  });*/
}

/*EuropaWrapper.getSendPort = ()=>{
  return this.sendPort;
}

EuropaWrapper.getReceivePort = ()=>{
  return this.receivePort;
}
*/
EuropaWrapper.processor = ()=>{
  return this.processor.processor()
}

EuropaWrapper.close = ()=>{
  return this.app.close();
}

module.exports = EuropaWrapper;