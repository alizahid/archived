import { get } from 'lodash'
import moment from 'moment'
import shortHash from 'short-hash'

import { firebase } from './lib'

const notifications = {}

export default async ({ app, body, icon, remove, time, title }) => {
  if (!firebase.user) {
    return
  }

  const hash = shortHash(`${app}:${title}:${body}`)

  if (remove) {
    const notifications = await firebase
      .firestore()
      .collection('notifications')
      .where('userId', '==', firebase.user.uid)
      .where('hash', '==', hash)
      .limit(1)
      .get()

    const notification = get(notifications, 'docs.0.ref')

    if (notification) {
      await notification.delete()
    }

    return
  }

  const last = get(notifications, hash)
  const timestamp = moment().subtract(3, 'seconds')

  if (last && timestamp.isAfter(last)) {
    notifications[hash] = timestamp.valueOf()

    return
  }

  notifications[hash] = timestamp.valueOf()

  const { exclude } = await firebase.getUser()

  if (exclude) {
    const regex = new RegExp(exclude, 'i')

    if (regex.test(app) || regex.test(body) || regex.test(title)) {
      return
    }
  }

  await firebase
    .firestore()
    .collection('notifications')
    .add({
      app,
      body,
      hash,
      icon,
      time,
      title,
      userId: firebase.user.uid
    })
}
