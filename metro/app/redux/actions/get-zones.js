import {
  GET_ZONES_PENDING,
  GET_ZONES_FULFILLED,
  GET_ZONES_REJECTED
} from '../constants'

import { firebase, sentry } from '../../lib'

export const getZonesPending = () => {
  return {
    type: GET_ZONES_PENDING
  }
}

export const getZonesSuccess = data => {
  return {
    type: GET_ZONES_FULFILLED,
    data
  }
}

export const getZonesFailure = error => {
  return {
    type: GET_ZONES_REJECTED,
    error
  }
}

export default () => {
  return dispatch => {
    dispatch(getZonesPending())

    firebase
      .database()
      .ref('/zones')
      .once('value')
      .then(snapshot => {
        const json = snapshot.toJSON()

        const data = Object.values(json)

        const zones = data.map((zone, index) => ({
          ...zone,
          id: index,
          two: Object.values(zone.two),
          three: Object.values(zone.three)
        }))

        dispatch(getZonesSuccess(zones))
      })
      .catch(error => {
        dispatch(getZonesFailure(error))

        sentry.report(error)
      })
  }
}
