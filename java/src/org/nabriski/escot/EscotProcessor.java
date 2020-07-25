package org.nabriski.escot;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class EscotProcessor extends EscotBridge implements Processor {

    public EscotProcessor(int port){
        super(port);
    }

    public Processor processor(){
      return this;
    }

     @Override
    public void process(Exchange e) throws Exception {
      String key = this.generateKey();
       //put Exchange in some concurrent hashmap
      EscotBridge.exchanges.put(key,e);
      this.sendToNode(key);
    }

  }