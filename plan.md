### EuropaProcessor.java
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
### EuropaProcessor.js
```javascript
const zmq = require('zmq')
  , responder = zmq.socket('rep');
  
EuropaProcessor = {};
EuropaProcessor.init = (processor)=>{

  this.exchanges = new Java.type("ConcurrentHashMap<String,Exchange>");
  this.port = //generate random port;
  this.javaProcessor = new Java.type("EuropaProcessor")(this.port,this.exchanges);
  this.processorPromise = processorPromise;
  
  responder.connect('tcp://localhost:'+port');
  responder.on('message', function(exchangeId) {
    const ex = this.exchanges.get(exchangeId.toString());
    const response = await processor(ex);
  });
  
}

EuropaProcessor.getJavaProcessor(){
  return this.javaProcessor;
}
```

### EuropaRouteBuilder.js
```javascript
const DefaultCamelContextClass = Java.type(
  "org.apache.camel.impl.DefaultCamelContext"
);
const RouteBuilderClass = Java.type("org.apache.camel.builder.RouteBuilder");

const camelContext = new DefaultCamelContextClass();

const internalEuropaRouteBuilder = Java.extend(RouteBuilderClass);

const create = (config)=>{ 
  return new EuropaRouteBuilder({
    configure: config,
    processor: function(processor){
      const eProc = Object.create(EuropaProcessor);
      eProc.init(processor);
      Java.super(route).processor(eProc.getJavaProcessor());
    }
  });
}

```
