package org.nabriski.escot;


import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

public class EscotAggregationStrategy extends EscotBridge implements AggregationStrategy {

    public EscotAggregationStrategy(int port) {
        super(port);
    }

    @Override
    public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

      String oldKey = this.generateKey();
      EscotBridge.exchanges.put(oldKey,oldExchange);

      String newKey = this.generateKey();
      EscotBridge.exchanges.put(newKey,newExchange);
      String returnedExchangeKey = this.sendToNode(oldKey+"/"+newKey);

      return EscotBridge.exchanges.get(returnedExchangeKey);

    }

    public AggregationStrategy getAggregationStrategy(){
        return this;
    }
    
}