package org.nabriski.europa;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.zeromq.SocketType;
import org.zeromq.ZContext;
import org.zeromq.ZMQ.Socket;


public class EuropaProcessor implements Processor {

    ZContext context;
    int sendPort,receivePort;
    public static ConcurrentHashMap<String,Exchange> exchanges = new ConcurrentHashMap<String,Exchange>();

    public EuropaProcessor(int sendPort, int receivePort){
      this.context = new ZContext();
      this.sendPort = sendPort;
      this.receivePort = receivePort;
    }

    public Processor processor(){
      return this;
    }

     @Override
    public void process(Exchange e) throws Exception {
      
      String key = generateKey();
       //put Exchange in some concurrent hashmap
      EuropaProcessor.exchanges.put(key,e);

      Socket xmitter = context.createSocket(SocketType.PAIR);
      xmitter.connect("tcp://*:"+sendPort);
      xmitter.send(key, 0);
      xmitter.close();     
      
      Socket receiver = context.createSocket(SocketType.PAIR);
      receiver.bind("tcp://*:"+receivePort);
      receiver.recv(0);
      receiver.close();
      
    }

    private String generateKey() {
      return UUID.randomUUID().toString();
    }

  }