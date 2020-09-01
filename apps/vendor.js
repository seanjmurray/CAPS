'use strict';

const emitter = require('../libs/events');
const faker = require('faker');
/* 
Vendor Module
Declare your store name (perhaps in a .env file, so that this module is re-usable)
Every 5 seconds, simulate a new customer order
Create a fake order, as an object:
storeName, orderId, customerName, address
Emit a ‘pickup’ event and attach the fake order as payload
HINT: Have some fun by using the faker library to make up phony information
Monitor the system for events …
Whenever the ‘delivered’ event occurs
Log “thank you” to the console
*/


const orderMachine = () => {
  const order = {
    storeName: faker.company.companyName(),
    orderId: faker.finance.routingNumber(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  }
  emitter.emit('pickup', order);
};
emitter.emit()


const handleDelivery = () => {
  console.log('VENDOR: Thank you')
};

emitter.on('delivered', handleDelivery);

setInterval(orderMachine, 5000);