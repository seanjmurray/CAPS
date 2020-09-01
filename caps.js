'use strict';

const emitter = require("./libs/events");
require('./apps/driver')
require('./apps/vendor')
/* 
Main Hub Application
Manages the state of every package (ready for pickup, in transit, delivered, etc)
Logs every event to the console with a timestamp and the event payload
i.e. “EVENT {}”
*/


const logger = (event) => {
  const time = new Date().toString()
  console.log()
  console.log('EVENT: ', time, event)
}


emitter.on('pickup', logger)
emitter.on('in-transit', logger)
emitter.on('delivered', logger)
