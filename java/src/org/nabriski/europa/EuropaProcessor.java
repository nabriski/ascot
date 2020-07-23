package org.nabriski.europa;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class EuropaProcessor extends EuropaBridge implements Processor {

    public EuropaProcessor(int port){
        super(port);
    }

    public Processor processor(){
      return this;
    }

     @Override
    public void process(Exchange e) throws Exception {
      String key = this.generateKey();
       //put Exchange in some concurrent hashmap
      EuropaBridge.exchanges.put(key,e);
      this.sendToNode(key);
    }

  }