import {
  GET_LINES_PENDING,
  GET_LINES_FULFILLED,
  GET_LINES_REJECTED
} from '../constants'

import { firebase, sentry } from '../../lib'

export const getLinesPending = () => {
  return {
    type: GET_LINES_PENDING
  }
}

export const getLinesSuccess = data => {
  return {
    type: GET_LINES_FULFILLED,
    data
  }
}

export const getLinesFailure = error => {
  return {
    type: GET_LINES_REJECTED,
    error
  }
}

export default () => {
  return dispatch => {
    dispatch(getLinesPending())

    firebase
      .database()
      .ref('/lines')
      .once('value')
      .then(snapshot => {
        const json = snapshot.toJSON()

        const data = Object.values(json)

        const lines = data.map(line => ({
          ...line,
          id: line.name.toLowerCase(),
          coordinates: Object.values(line.coordinates)
        }))

        dispatch(getLinesSuccess(lines))
      })
      .catch(error => {
        dispatch(getLinesFailure(error))

        sentry.report(error)
      })
  }
}
