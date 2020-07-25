package org.nabriski.ascot;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class AscotProcessor extends AscotBridge implements Processor {

    public AscotProcessor(int port){
        super(port);
    }

    public Processor processor(){
      return this;
    }

     @Override
    public void process(Exchange e) throws Exception {
      String key = this.generateKey();
       //put Exchange in some concurrent hashmap
      AscotBridge.exchanges.put(key,e);
      this.sendToNode(key);
    }

  }