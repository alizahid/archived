import { combineReducers } from 'redux'

import fares from './fares'
import lines from './lines'
import stations from './stations'
import zones from './zones'

import state from './state'

export default combineReducers({
  fares,
  lines,
  stations,
  zones,

  state
})
