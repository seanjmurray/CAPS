'use strict';
require('dotenv').config()
const faker = require('faker');
const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
  socket.emit('join', process.env.STORE_ID)
    setInterval(orderMachine, 500);
    // logs thank you
    socket.on('delivered', (payload) => {
      handleDelivery(payload)
  })
  })
// emits pickup event every .5 sec
const orderMachine = () => {
    const payload = {
      storeName: process.env.STORE_ID,
      orderID: faker.finance.routingNumber(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
    socket.emit('pickup', payload);
};


const handleDelivery = (order) => {
  console.log(`VENDOR: Thank you for delivering ${order.orderID}`)
};

