package org.nabriski.europa;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.zeromq.SocketType;
import org.zeromq.ZContext;
import org.zeromq.ZMQ.Socket;


class EuropaProcessor implements Processor {

    ZContext context;
    String channelId;
    ConcurrentHashMap<String,Exchange> exchanges;

    public EuropaProcessor(ZContext context,String channelId,ConcurrentHashMap<String,Exchange> exchanges){
      this.context = context;
      this.channelId = channelId;
      this.exchanges = exchanges;
    }
     @Override
    public void process(Exchange e) throws Exception {
    
      String key = generateKey();
      //put Exchange in some concurrent hashmap
      this.exchanges.put(key,e);

      Socket xmitter = context.createSocket(SocketType.PAIR);
      xmitter.connect("inproc://"+this.channelId+"-key");
      xmitter.send(key, 0);
      xmitter.close();     
      
      Socket receiver = context.createSocket(SocketType.PAIR);
      receiver.bind("inproc://"+this.channelId+"-done");
      receiver.recv(0);
      receiver.close();
      
    }

    private String generateKey() {
      return UUID.randomUUID().toString();
    }

  }