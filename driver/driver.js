'use strict';
const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
  // emits in-transit after 1.5 sec then delivery after 3 sec
  socket.on('pickup', payload => {
    handlePickup(payload)
  })
})

const handlePickup = (order) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderID}`)
    socket.emit('in-transit', order)
    handleDelivery(order)
  },1500)
}

const handleDelivery = (order) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${order.orderID}`)
    socket.emit('delivered', order)
  },3000)
}
