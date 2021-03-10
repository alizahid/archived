const functions = require('firebase-functions')

const messaging = require('./lib/messaging')

exports.notify = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async snap => {
    const { app, body, title, userId } = snap.data()

    await messaging.send({
      userId,
      body: `${title}: ${body}`,
      title: `from ${app}`
    })
  })
