const admin = require('firebase-admin')
const functions = require('firebase-functions')

class Firestore {
  constructor() {
    admin.initializeApp(functions.config().firebase)
  }

  async getUser(id) {
    const {
      docs: [user]
    } = await admin
      .firestore()
      .collection('users')
      .where('userId', '==', id)
      .limit(1)
      .get()

    return user.data()
  }
}

module.exports = new Firestore()
