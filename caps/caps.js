'use strict';

const io = require('socket.io')(process.env.PORT || 3000)

io.on('connection', (socket) => {
console.log(socket.id)
});

// CAPS Namespace for vendor and driver
const caps = io.of('/caps')

caps.on('connection', (socket) => {
  socket.on('join', id => {
    socket.join(id)
  })
  // pickup handler re emits event
  socket.on('pickup', payload => {
    logIt('pickup',payload)
    caps.emit('pickup', payload)
  })
  // in transit event only sends back to vendor
  socket.on('in-transit', payload => {
    logIt('in-transit',payload)
    caps.to(payload.storeName).emit('in-transit', payload)
  })
  // delivery only sends back to vendor
  socket.on('delivered', payload => {
    logIt('delivered',payload)
    caps.to(payload.storeName).emit('delivered', payload)
  })
  
})

function logIt(eventName, payload) {
  console.log('EVENT', {event: eventName,time: new Date(), payload});
}


