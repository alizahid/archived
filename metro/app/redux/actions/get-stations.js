import kebabCase from 'lodash.kebabcase'

import {
  GET_STATIONS_PENDING,
  GET_STATIONS_FULFILLED,
  GET_STATIONS_REJECTED
} from '../constants'

import { firebase, sentry } from '../../lib'

export const getStationsPending = () => {
  return {
    type: GET_STATIONS_PENDING
  }
}

export const getStationsSuccess = data => {
  return {
    type: GET_STATIONS_FULFILLED,
    data
  }
}

export const getStationsFailure = error => {
  return {
    type: GET_STATIONS_REJECTED,
    error
  }
}

export default () => {
  return dispatch => {
    dispatch(getStationsPending())

    firebase
      .database()
      .ref('/stations')
      .once('value')
      .then(snapshot => {
        const json = snapshot.toJSON()

        const data = Object.values(json)

        const stations = data.map((station, index) => {
          let key
          let image

          switch (station.type) {
            case 'metro':
              key = `${station.type}-${station.line}-${kebabCase(station.name)}`
              image = {
                uri: station.line === 'green' ? 'station_green' : 'station_red'
              }

              break

            case 'tram':
              key = `${station.type}-${kebabCase(station.name)}`
              image = {
                uri: 'station_tram'
              }

              break

            case 'monorail':
              key = `${station.type}-${kebabCase(station.name)}`
              image = {
                uri: 'station_monorail'
              }

              break
          }

          return {
            ...station,
            image,
            key,
            id: index + 1,
            connections: station.connections
              ? Object.values(station.connections)
              : undefined,
            numbers: station.numbers
              ? Object.values(station.numbers)
              : undefined
          }
        })

        dispatch(getStationsSuccess(stations))
      })
      .catch(error => {
        dispatch(getStationsFailure(error))

        sentry.report(error)
      })
  }
}
