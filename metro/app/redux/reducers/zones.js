import {
  GET_ZONES_PENDING,
  GET_ZONES_FULFILLED,
  GET_ZONES_REJECTED
} from '../constants'

const initialState = {
  data: null,
  error: null,
  loading: true
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_ZONES_PENDING:
      return {
        ...state
      }

    case GET_ZONES_FULFILLED:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_ZONES_REJECTED:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
