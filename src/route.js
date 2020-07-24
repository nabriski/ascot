const {CamelContext,createRouteBuilder,createProcessor} = require("./index");
const camelContext = new CamelContext();
const request = require("superagent");

const start = async ()=>{

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
}

start();
/*
 
}
*/


//setTimeout(function () {}, 10000);
/*
const builder = new TRouteBuilderClass() {
    public void configure() {
        errorHandler(deadLetterChannel("mock:error"));

        from("direct:a").to("direct:b");
    }
};*/
