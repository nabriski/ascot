const getPort = require('get-port');
const express = require('express');
const util = require('util');


ProcessorWrapper = {};
ProcessorWrapper.init = async (processorPromise,_port)=>{

  this.app = express()
  const port =    _port || await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.processor = new EuropaProcessorClass(port);
  this.processorPromise = processorPromise;

  this.app.get('/:key', async(req, res) => {
    const ex = EuropaProcessorClass.getExchanges().get(req.params.key);
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