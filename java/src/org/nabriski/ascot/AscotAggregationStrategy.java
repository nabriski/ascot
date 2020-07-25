package org.nabriski.ascot;


import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

public class AscotAggregationStrategy extends AscotBridge implements AggregationStrategy {

    public AscotAggregationStrategy(int port) {
        super(port);
    }

    @Override
    public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

      String oldKey = this.generateKey();
      AscotBridge.exchanges.put(oldKey,oldExchange);

      String newKey = this.generateKey();
      AscotBridge.exchanges.put(newKey,newExchange);
      String returnedExchangeKey = this.sendToNode(oldKey+"/"+newKey);

      return AscotBridge.exchanges.get(returnedExchangeKey);

    }

    public AggregationStrategy getAggregationStrategy(){
        return this;
    }
    
}