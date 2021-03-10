import geolib from 'geolib'
import { get } from 'lodash'

export default {
  current() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords

        resolve({
          latitude,
          longitude
        })
      }, reject)
    })
  },

  watch(callback) {
    return navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords

      callback({
        latitude,
        longitude
      })
    })
  },
  clearWatch(id) {
    navigator.geolocation.clearWatch(id)
    navigator.geolocation.stopObserving()
  },

  getNearestStation(stations, location) {
    const data = stations.map(station => ({
      ...station,
      ...station.coordinates
    }))

    const { key, distance } = geolib.findNearest(location, data)

    const { name } = get(stations, key, {})

    return {
      name,
      distance
    }
  }
}
