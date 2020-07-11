package org.nabriski.europa;

import java.util.concurrent.ConcurrentHashMap;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;


class EuropaProcessor implements Processor {

    int port;
    ConcurrentHashMap<String,Exchange> exchanges;

    public EuropaProcessor(int port,ConcurrentHashMap<String,Exchange> exchanges){
      this.port = port;
      this.exchanges = exchanges;
    }
     @Override
    public void process(Exchange e) throws Exception {
    
      String key = generateKey();
      //put Exchange in some concurrent hashmap
      this.exchanges.put(key,e);
      
      //send zero mq message to node with hash key
      try (ZContext context = new ZContext()) {
       
        //Socket to talk to server
        Socket requester = context.createSocket(SocketType.REQ);
        requester.connect("tcp://localhost:"+this.port);
        System.out.println("launch and connect client.");
        requester.send(key, 0);
        String reply = requester.recvStr(0);
      
      }
      
    }

  }