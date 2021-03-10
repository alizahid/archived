import {
  GET_LINES_PENDING,
  GET_LINES_FULFILLED,
  GET_LINES_REJECTED
} from '../constants'

const initialState = {
  data: null,
  error: null,
  loading: true
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_LINES_PENDING:
      return {
        ...state
      }

    case GET_LINES_FULFILLED:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_LINES_REJECTED:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
