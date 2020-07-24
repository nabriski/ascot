module.exports.CamelContext = Java.type(
    "org.apache.camel.impl.DefaultCamelContext"
);

module.exports.RouteBuilder = RouteBuilder = Java.type("org.apache.camel.builder.RouteBuilder");
  
module.exports.createRouteBuilder = (conf)=>{
  const DerivedRouteBuilder = Java.extend(RouteBuilder);
  return new DerivedRouteBuilder(conf);
}

module.exports.ProcessorWrapper = ProcessorWrapper = require("./ProcessorWrapper");

module.exports.createProcessor = async (procPromise)=>{
    const wrapper = Object.create(ProcessorWrapper);
    await wrapper.init(procPromise);
    return wrapper.processor();
}
  