package org.nabriski.europa;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

public class EuropaAggregationStrategy extends EuropaBridge implements AggregationStrategy {

    public EuropaAggregationStrategy(int port) {
        super(port);
    }

    @Override
    public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

      String oldKey = this.generateKey();
      EuropaBridge.exchanges.put(oldKey,oldExchange);

      String newKey = this.generateKey();
      EuropaBridge.exchanges.put(newKey,newExchange);
      String returnedExchangeKey = this.sendToNode(oldKey+"/"+newKey);

      return EuropaBridge.exchanges.get(returnedExchangeKey);

    }

    public AggregationStrategy getAggregationStrategy(){
        return this;
    }
    
}