package org.nabriski.europa;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.camel.Exchange;

public class EuropaBridge {

    int port;
    public static ConcurrentMap<String, Exchange> exchanges = new ConcurrentHashMap<String, Exchange>();

    public EuropaBridge(int port) {
        this.port = port;
    }

    protected String sendToNode(String path) {

        // put Exchange in some concurrent hashmap
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create("http://localhost:" + this.port + "/" + path))
                .build();

        HttpResponse<String> response = null;
        try {
            response = client.send(request, BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }

        return response.body();
    }
    
    protected String generateKey() {
      return UUID.randomUUID().toString();
    }

    public static ConcurrentMap<String,Exchange> getExchanges(){
        return exchanges;
    }
}