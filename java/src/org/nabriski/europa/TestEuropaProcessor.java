package org.nabriski.europa;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.concurrent.ConcurrentHashMap;

import org.apache.camel.Exchange;
import org.junit.jupiter.api.Test;
import org.zeromq.SocketType;
import org.zeromq.ZContext;
import org.zeromq.ZMQ.Socket;

public class TestEuropaProcessor {

     @Test
     public void TestEuropaProcessorIsResponding() {

          String channelId = "channel";
          ZContext context = new ZContext();

          // Socket to talk to clients
          Socket responder = context.createSocket(SocketType.REP);
          responder.connect("inproc://" + channelId);
          ConcurrentHashMap<String, Exchange> exchanges = new ConcurrentHashMap<String, Exchange>();
          EuropaProcessor p = new EuropaProcessor(context, channelId, exchanges);

          Thread thread = new Thread() {

               @Override
               public void run() {
                    try {
                         p.process(new MockExchange());
                    } catch (Exception e) {
                         e.printStackTrace();
                    }

               }
          };
          thread.start();

          Socket receiver = context.createSocket(SocketType.PAIR);
          receiver.bind("inproc://" + channelId + "-key");
          String key = receiver.recvStr(0);
          assertTrue(key.length() > 0);
          Exchange e = exchanges.get(key);
          assertNotNull(e);
          assertTrue(e instanceof MockExchange);
          receiver.close();

          Socket xmitter = context.createSocket(SocketType.PAIR);
          xmitter.connect("inproc://" + channelId + "-done");
          xmitter.send("done", 0);
          xmitter.close();

          try {
               thread.join();
          } catch (InterruptedException e1) {
               e1.printStackTrace();
          }

         

     }
    
}