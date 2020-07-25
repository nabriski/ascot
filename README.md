# Ascot
Apache Camel in Node over GraalVM

![Image of Ascot Cigarette](/docs/ascot.jpg)

## Install

TBD

## Run

TBD

## Usage

### Use With Node Processor
```javascript
const {CamelContext,createRouteBuilder,createProcessor} = require("Europa");
const camelContext = new CamelContext();
const request = require("superagent");

(async ()=>{

  const procFunc = async (exchange)=>{
    const resp = await request.get('http://api.icndb.com/jokes/random').accept('application/json');
    const str = `${resp.body.value.joke}`;
    exchange.getMessage().setBody(str);
    return;
  }
  const processor = await createProcessor(procFunc);

  const route = createRouteBuilder({
    configure: function () {
      const inst = Java.super(route);
      inst
        .from("timer://foo?fixedRate=true&period=10000")
        .process(processor)
        .log("${body}")
        .to("file:output");
    },
  });
  camelContext.addRoutes(route);
  camelContext.start();
})();

```
