package org.nabriski.europa;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;


public class EuropaProcessor implements Processor {

    int port;
    public static ConcurrentHashMap<String,Exchange> exchanges = new ConcurrentHashMap<String,Exchange>();

    public EuropaProcessor(int port){
      this.port = port;
    }

    public Processor processor(){
      return this;
    }

     @Override
    public void process(Exchange e) throws Exception {
      
      String key = generateKey();
       //put Exchange in some concurrent hashmap
      EuropaProcessor.exchanges.put(key,e);
      HttpClient client = HttpClient.newHttpClient();
      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create("http://localhost:"+this.port+"/"+key))
          .build();

      HttpResponse<String> response =
            client.send(request, BodyHandlers.ofString());
    }

    private String generateKey() {
      return UUID.randomUUID().toString();
    }

  }