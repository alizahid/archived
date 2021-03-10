import {
  GET_STATIONS_PENDING,
  GET_STATIONS_FULFILLED,
  GET_STATIONS_REJECTED
} from '../constants'

const initialState = {
  data: null,
  error: null,
  loading: true
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_STATIONS_PENDING:
      return {
        ...state
      }

    case GET_STATIONS_FULFILLED:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_STATIONS_REJECTED:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
