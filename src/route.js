const DefaultCamelContextClass = Java.type(
  "org.apache.camel.impl.DefaultCamelContext"
);
const RouteBuilderClass = Java.type("org.apache.camel.builder.RouteBuilder");
const ProcessorClass = Java.type("org.apache.camel.Processor");

const camelContext = new DefaultCamelContextClass();

const TestRouteClass = Java.extend(RouteBuilderClass);

const route = new TestRouteClass({
  configure: function () {
    const inst = Java.super(route);
    inst
      .from("timer://foo?fixedRate=true&period=3000")
      //.from("file://.")
      /*.process(
        new TestProcessor({
          process: function (exchange) {
            exchange.getIn().setBody("###### KOKO ######");
          },
        })
      )*/
      .log("${body}")
      .to("direct:null");
  },
});
/*
 
}
*/

camelContext.addRoutes(route);
camelContext.start();

setTimeout(function () {}, 10000);
/*
const builder = new TRouteBuilderClass() {
    public void configure() {
        errorHandler(deadLetterChannel("mock:error"));

        from("direct:a").to("direct:b");
    }
};*/
