const { Responder } = require('cote')

const responder = new Responder({
  name: 'search responder',
  namespace: 'search'
})

responder.on('search', ({ query }, callback) => {
  callback(null, `Your query is: ${query}`)
})
