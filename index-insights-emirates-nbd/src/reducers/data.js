import { SET_DATA, REMOVE_DATA } from '../actions'

export default (state = {}, { data, type }) => {
  switch (type) {
    case SET_DATA:
      return data

    case REMOVE_DATA:
      return []

    default:
      return state
  }
}
