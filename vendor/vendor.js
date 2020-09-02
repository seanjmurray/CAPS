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

const net = require('net')
const client = new net.Socket()

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
client.connect(port, host, () => {
})

client.on('connect', () => {
  setInterval(orderMachine, 5000);
})

const orderMachine = () => {
console.log('order')
    const message = {
      event: 'pickup',
      payload: {
      storeName: faker.company.companyName(),
      orderID: faker.finance.routingNumber(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
  }
    client.write(JSON.stringify(message));
};

client.on('data', (buffer) => {
  const event = JSON.parse(buffer)
  if(event.event === 'delivered'){
    handleDelivery(event.payload)
  }
})
const handleDelivery = (order) => {
  console.log(`VENDOR: Thank you for delivering ${order.orderID}`)
};

