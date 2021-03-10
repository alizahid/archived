import './index.scss'

import { StoreProvider } from 'easy-peasy'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { Header } from './components'
import { Favorites, Film, Home, Results } from './scenes'
import * as serviceWorker from './serviceWorker'
import { persistor, store } from './store'

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <StoreProvider store={store}>
      <BrowserRouter>
        <div className="main">
          <Header />
          <Route path="/" component={Home} exact />
          <Route path="/favorites" component={Favorites} />
          <Route path="/films/:id" component={Film} />
          <Route path="/search" component={Results} />
        </div>
      </BrowserRouter>
    </StoreProvider>
  </PersistGate>,
  document.getElementById('root')
)

serviceWorker.unregister()
