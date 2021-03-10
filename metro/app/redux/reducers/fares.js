import {
  GET_FARES_PENDING,
  GET_FARES_FULFILLED,
  GET_FARES_REJECTED
} from '../constants'

const initialState = {
  data: null,
  error: null,
  loading: true
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_FARES_PENDING:
      return {
        ...state
      }

    case GET_FARES_FULFILLED:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_FARES_REJECTED:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
