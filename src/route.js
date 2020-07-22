const DefaultCamelContextClass = Java.type(
  "org.apache.camel.impl.DefaultCamelContext"
);
const RouteBuilderClass = Java.type("org.apache.camel.builder.RouteBuilder");

const camelContext = new DefaultCamelContextClass();

const MyRouteClass = Java.extend(RouteBuilderClass);
const ProcessorWrapper = require("./ProcessorWrapper");
const request = require("superagent");

const start = async ()=>{
  const wrapper = Object.create(ProcessorWrapper);
  const procFunc = async (exchange)=>{
    const resp = await request.get('http://api.icndb.com/jokes/random').accept('application/json');
    const str = `${resp.body.value.joke}`;
    exchange.getMessage().setBody(str);
    return;
  }
  await wrapper.init(procFunc);

  const route = new MyRouteClass({
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
