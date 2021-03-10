const fs = require('fs')

const api = [
  {
    key: 'fares',
    files: ['fares']
  },
  {
    key: 'lines',
    files: ['green-line', 'red-line', 'tram', 'monorail']
  },
  {
    key: 'news',
    files: ['news']
  },
  {
    key: 'stations',
    files: ['stations']
  },
  {
    key: 'zones',
    files: ['zones']
  }
]

api.forEach(({ key, files }) => {
  let data = []

  if (files.length > 1) {
    files.forEach(file => data.push(require(`./src/${file}.json`)))
  } else {
    data = require(`./src/${files[0]}.json`)
  }

  fs.writeFileSync(`./v1/${key}.json`, JSON.stringify(data), 'utf8')
})

const index = require('./src/index.json')

index.updated = new Date()

fs.writeFileSync('./v1/index.json', JSON.stringify(index), 'utf8')
