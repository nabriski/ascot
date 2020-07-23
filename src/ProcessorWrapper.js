const getPort = require('get-port');
const express = require('express')


ProcessorWrapper = {};
ProcessorWrapper.init = async (processorPromise)=>{

  this.app = express()
  const port =     await getPort();
  const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
  this.processor = new EuropaProcessorClass(port);
  this.processorPromise = processorPromise;

  this.app.get('/:key', async(req, res) => {
    const ex = EuropaProcessorClass.getExchanges().get(req.params.key);
    await processorPromise(ex);
    res.end('done')
  })
  this.app.listen(port, () => {})
}

ProcessorWrapper.processor = ()=>{
  return this.processor.processor()
}

ProcessorWrapper.close = ()=>{
  return this.app.close();
}

module.exports = ProcessorWrapper;