const mongoose = require('mongoose')

const Log = require('./log')

const counter = new mongoose.Schema({
  _id: String,
  why: String
})

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    attack: String,
    attribute: String,
    roles: [String],
    strong: [counter],
    weak: [counter],
    combo: [counter]
  },
  {
    collection: 'heroes'
  }
)

schema.post('save', doc => {
  const { id, _action, _changes, _user } = doc

  Log.create({
    action: _action || 'update_hero',
    changes: _changes,
    hero: id,
    user: _user._id
  })
})

schema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Hero', schema)
