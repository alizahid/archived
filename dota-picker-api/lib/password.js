const { SALT_ROUNDS } = process.env

const bcrypt = require('bcrypt')
const shortid = require('shortid')

module.exports = {
  async hash(password = shortid.generate()) {
    return bcrypt.hash(password, parseInt(SALT_ROUNDS, 10))
  },
  async compare(password, hash) {
    return bcrypt.compare(password, hash)
  }
}
