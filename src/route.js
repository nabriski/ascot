const DefaultCamelContextClass = Java.type(
  "org.apache.camel.impl.DefaultCamelContext"
);
const RouteBuilderClass = Java.type("org.apache.camel.builder.RouteBuilder");

const camelContext = new DefaultCamelContextClass();

const MyRouteClass = Java.extend(RouteBuilderClass);
const EuropaWrapper = require("./EuropaWrapper");

const start = async ()=>{
  const wrapper = Object.create(EuropaWrapper);
  const procFunc = async (exchange)=>{
    exchange.getMessage().setBody("yo ho ho !!!!");
    return;
  }
  await wrapper.init(procFunc);

  const route = new MyRouteClass({
    configure: function () {
      const inst = Java.super(route);
      inst
        .from("timer://foo?period=3&repeatCount=5")
        .process(
          wrapper.processor()
        )
        .log("${body}")
        .to("direct:null");
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
