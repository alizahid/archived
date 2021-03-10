import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

export default () => {
  const enhancer = compose(applyMiddleware(thunk))

  return createStore(reducers, enhancer)
}
