# europa
Apache Camel in Node over GraalVM

## Install

TBD

## Usage

### Use With Node Processor
```javascript
const {CamelContext,createRouteBuilder,createProcessorWrapper} = require("./index");
const camelContext = new CamelContext();
const request = require("superagent");

const start = async ()=>{

  const procFunc = async (exchange)=>{
    const resp = await request.get('http://api.icndb.com/jokes/random').accept('application/json');
    const str = `${resp.body.value.joke}`;
    exchange.getMessage().setBody(str);
    return;
  }
  const wrapper = await createProcessorWrapper(procFunc);

  const route = createRouteBuilder({
    configure: function () {
      const inst = Java.super(route);
      inst
        .from("timer://foo?fixedRate=true&period=10000")
        .process(
          wrapper.processor()
        )
        .log("${body}")
        .to("file:output");
    },
  });
  camelContext.addRoutes(route);
  camelContext.start();
}

start();

```
