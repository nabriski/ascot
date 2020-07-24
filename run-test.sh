node --jvm --vm.cp=$(echo java/lib/*.jar | tr ' ' ':'):java/build/ src/ProcessorWrapper.spec.js
node --jvm --vm.cp=$(echo java/lib/*.jar | tr ' ' ':'):java/build/ src/AggregationStrategyWrapper.spec.js
