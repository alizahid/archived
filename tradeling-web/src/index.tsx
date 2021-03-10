import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { Landing, Results } from './scenes'
import { unregister } from './serviceWorker'
import { persistor, store } from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route path="/search/:type/:query">
              <Results />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

unregister()
