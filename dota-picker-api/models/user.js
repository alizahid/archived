const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    index: true,
    type: String,
    unique: true
  },
  password: {
    select: false,
    type: String
  },
  token: {
    index: true,
    select: false,
    type: String,
    unique: true
  },
  admin: {
    default: false,
    type: Boolean
  },
  created: {
    default: Date.now,
    type: Date
  },
  removed: {
    default: null,
    index: true,
    type: mongoose.Schema.Types.Mixed
  }
})

schema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('User', schema)
