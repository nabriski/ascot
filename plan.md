```java
EuropaProcessor extends Processor{

  public EuropaProcessor(int port){
    this.port = port;
  }
  
  public void Process(Exchange e){
  
    String key = generateKey();
    //put Exchange in some concurrent hashmap
    ConcurrentHashMap.put(key,e);
    
    //send zero mq message to node with hash key
    try (ZContext context = new ZContext()) {
     
      //Socket to talk to server
      Socket requester = context.createSocket(SocketType.REQ);
      requester.connect("tcp://localhost:"+port);
      System.out.println("launch and connect client.");
      requester.send(key, 0);
      String reply = requester.recvStr(0);
    
    }
    
  }
  
  

}
```
