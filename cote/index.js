const http = require('http')
const { parse } = require('url')

const { Requester } = require('cote')

const homeRequester = new Requester({
  name: 'home requester',
  namespace: 'home'
})

const searchRequester = new Requester({
  name: 'search requester',
  namespace: 'search'
})

const server = http.createServer((request, response) => {
  const { url } = request
  const { query, pathname } = parse(url, true)

  if (pathname === '/home') {
    homeRequester.send(
      {
        type: 'hello',
        name: query.name
      },
      (error, data) => {
        response.write(data)
        response.end()
      }
    )
  } else if (pathname === '/search') {
    searchRequester.send(
      {
        type: 'search',
        query: query.query
      },
      (error, data) => {
        response.write(data)
        response.end()
      }
    )
  } else {
    response.write('foo')
    response.end()
  }
})

server.listen(3000)
