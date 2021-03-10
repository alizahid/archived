const { Responder } = require('cote')

const responder = new Responder({
  name: 'home responder',
  namespace: 'home'
})

responder.on('hello', ({ name }, callback) => {
  callback(null, `Hello, ${name}`)
})
