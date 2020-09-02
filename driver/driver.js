'use strict';

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
const net = require('net')
const client = new net.Socket()

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
client.connect(port, host, () => {
})
client.on('data', (buffer) => {
  const event = JSON.parse(buffer)
  if(event.event === 'pickup'){
    handlePickup(event.payload)
  }else if(event.event === 'in-transit'){
    handleDelivery(event.payload)
  }
})

const handlePickup = (order) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderID}`)
    const message = {
      event: 'in-transit',
      payload: order
    }
    client.write(JSON.stringify(message))
  },1000)
}

const handleDelivery = (order) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${order.orderID}`)
    const message = {
      event: 'delivered',
      payload: order
    }
    client.write(JSON.stringify(message))
  },3000)
}
