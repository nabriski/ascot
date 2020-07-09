```java
EuropaProcessor extends Processor{

  public EuropaProcessor(int port,ConcurrentHashMap<String,Exchange> exchanges){
    this.port = port;
    this.exchanges = exchanges;
  }
  
  public void Process(Exchange e){
  
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
```

```javascript
EuropaProcessor = {};
EuropaProcessor.init = (processor)=>{
  this.exchanges = new Java.type("ConcurrentHashMap<String,Exchange>");
  this.port = //generate random port;
  this.javaProcessor = new Java.type("EuropaProcessor")(this.port,this.exchanges);
}

```



```
