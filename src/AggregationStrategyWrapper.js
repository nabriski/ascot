const getPort = require('get-port');
const express = require('express');
const util = require('util');
const uuid = require('uuid-random');



AggregationStrategyWrapper = {};
AggregationStrategyWrapper.init = async (processorPromise,_port)=>{

  this.app = express()
  const port =    _port || await getPort();
  const EscotAggregationStrategyClass = Java.type("org.nabriski.escot.EscotAggregationStrategy");
  this.aggregation= new EscotAggregationStrategyClass(port);
  this.processorPromise = processorPromise;

  this.app.get('/:keyEx1/:keyEx2', async(req, res) => {
    const ex1 = EscotAggregationStrategyClass.getExchanges().get(req.params.keyEx1);
    const ex2 = EscotAggregationStrategyClass.getExchanges().get(req.params.keyEx2);
    const exRes = await processorPromise(ex1,ex2);
    const resKey = uuid();
    if(exRes) EscotAggregationStrategyClass.getExchanges().put(resKey,exRes);

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