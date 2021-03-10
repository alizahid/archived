import {
  GET_FARES_PENDING,
  GET_FARES_FULFILLED,
  GET_FARES_REJECTED
} from '../constants'

import { firebase, sentry } from '../../lib'

export const getFaresPending = () => {
  return {
    type: GET_FARES_PENDING
  }
}

export const getFaresSuccess = data => {
  return {
    type: GET_FARES_FULFILLED,
    data
  }
}

export const getFaresFailure = error => {
  return {
    type: GET_FARES_REJECTED,
    error
  }
}

export default () => {
  return dispatch => {
    dispatch(getFaresPending())

    firebase
      .database()
      .ref('/fares')
      .once('value')
      .then(snapshot => {
        const json = snapshot.toJSON()

        dispatch(getFaresSuccess(json))
      })
      .catch(error => {
        dispatch(getFaresFailure(error))

        sentry.report(error)
      })
  }
}
