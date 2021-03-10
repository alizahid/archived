const admin = require('firebase-admin')
const functions = require('firebase-functions')

class Messaging {
  constructor() {
    admin.initializeApp(functions.config().firebase)
  }

  send({ body, title, userId }) {
    return admin.messaging().send({
      topic: `user_${userId}`,
      notification: {
        body,
        title
      }
    })
  }
}

module.exports = new Messaging()
