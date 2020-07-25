const getPort = require('get-port');
const express = require('express');
const util = require('util');


ProcessorWrapper = {};
ProcessorWrapper.init = async (processorPromise,_port)=>{

  this.app = express()
  const port =    _port || await getPort();
  const EscotProcessorClass = Java.type("org.nabriski.escot.EscotProcessor");
  this.processor = new EscotProcessorClass(port);
  this.processorPromise = processorPromise;

  this.app.get('/:key', async(req, res) => {
    const ex = EscotProcessorClass.getExchanges().get(req.params.key);
    await processorPromise(ex);
    res.end('done')
  })

  const listen = util.promisify(this.app.listen.bind(this.app));
  await listen(port);
}

ProcessorWrapper.processor = ()=>{
  return this.processor.processor()
}

ProcessorWrapper.close = ()=>{
  return this.app.close();
}

module.exports = ProcessorWrapper;