const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user: {
    index: true,
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  hero: {
    index: true,
    type: String
  },
  action: String,
  changes: mongoose.Schema.Types.Mixed,
  created: {
    default: Date.now,
    type: Date
  }
})

schema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Log', schema)
