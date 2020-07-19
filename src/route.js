const DefaultCamelContextClass = Java.type(
  "org.apache.camel.impl.DefaultCamelContext"
);
const RouteBuilderClass = Java.type("org.apache.camel.builder.RouteBuilder");
//const ProcessorClass = Java.type("org.apache.camel.Processor");

const camelContext = new DefaultCamelContextClass();

const TestRouteClass = Java.extend(RouteBuilderClass);
const EuropaProcessor = require("./EuropaProcessor");
const EuropaProcessorClass = Java.type("org.nabriski.europa.EuropaProcessor");
const jp = new EuropaProcessorClass(8899,9988)
const proc = Object.create(EuropaProcessor);
const procFunc = async (exchange)=>{
  exchange.getMessage().setBody("yo ho ho !!!!");
  return;
}
proc.init(jp,procFunc,8899,9988);


const route = new TestRouteClass({
  configure: function () {
    const inst = Java.super(route);
    inst
      .from("timer://foo?period=3&repeatCount=5")
      //.from("file://.")
    /*  .process(
          jp
      )*/
      .process(
        jp
      )
      .log("${body}")
      .to("direct:null");
  },
});
/*
 
}
*/

camelContext.addRoutes(route);
camelContext.start();

//setTimeout(function () {}, 10000);
/*
const builder = new TRouteBuilderClass() {
    public void configure() {
        errorHandler(deadLetterChannel("mock:error"));

        from("direct:a").to("direct:b");
    }
};*/
