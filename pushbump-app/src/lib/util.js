import { get, groupBy, orderBy } from 'lodash'

export default class Util {
  static groupNotifications(snapshot) {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    const groups = groupBy(notifications, 'app')

    return Object.keys(groups).map(title => {
      const group = get(groups, title)

      return {
        title,
        icon: get(group, '0.icon'),
        data: orderBy(group, 'time', 'desc')
      }
    })
  }
}
