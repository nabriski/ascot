const getPort = require('get-port');
const express = require('express');
const util = require('util');
const uuid = require('uuid-random');



AggregationStrategyWrapper = {};
AggregationStrategyWrapper.init = async (processorPromise,_port)=>{

  this.app = express()
  const port =    _port || await getPort();
  const AscotAggregationStrategyClass = Java.type("org.nabriski.ascot.AscotAggregationStrategy");
  this.aggregation= new AscotAggregationStrategyClass(port);
  this.processorPromise = processorPromise;

  this.app.get('/:keyEx1/:keyEx2', async(req, res) => {
    const ex1 = AscotAggregationStrategyClass.getExchanges().get(req.params.keyEx1);
    const ex2 = AscotAggregationStrategyClass.getExchanges().get(req.params.keyEx2);
    const exRes = await processorPromise(ex1,ex2);
    const resKey = uuid();
    if(exRes) AscotAggregationStrategyClass.getExchanges().put(resKey,exRes);

    res.end(resKey);
  })

  const listen = util.promisify(this.app.listen.bind(this.app));
  await listen(port);
}

AggregationStrategyWrapper.aggregationStrategy = ()=>{
  return this.aggregationStrategy.aggregationStrategy()
}

AggregationStrategyWrapper.close = ()=>{
  return this.app.close();
}

module.exports = AggregationStrategyWrapper;