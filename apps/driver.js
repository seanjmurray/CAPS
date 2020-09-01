'use strict';

const emitter = require('../libs/events');

/*
Monitor the system for events …
On the ‘pickup’ event …
  - Wait 1 second
  - Log “DRIVER: picked up [ORDER_ID]” to the console.
  - Emit an ‘in-transit’ event with the payload you received
  - Wait 3 seconds
  - Log “delivered” to the console
  - Emit a ‘delivered’ event with the same payload
*/



const handlePickup = (order) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderId}`)
    emitter.emit('in-transit', order)
  },1000)
}

const handleDelivery = (order) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${order.orderId}`)
    emitter.emit('delivered', order)
  },3000)
}

emitter.on('pickup', handlePickup)
emitter.on('in-transit', handleDelivery)