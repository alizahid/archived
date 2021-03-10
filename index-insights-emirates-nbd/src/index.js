import React from 'react'
import ReactDOM from 'react-dom'
import { defaults } from 'react-chartjs-2'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { createStore } from 'redux'

import { insights, ui } from './assets'
import { Reset } from './components'
import { Charts, Data, Help, Insights } from './scenes'
import reducers from './reducers'

import registerServiceWorker from './registerServiceWorker'

import './index.css'

defaults.global.defaultFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const { help } = ui

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <header>
          <Link to="/">
            <img src={insights} alt="Index Insights" />
            <h1>
              Index Insights
              <span>for Emirates NBD</span>
            </h1>
          </Link>
          <aside>
            <Link to="/help">
              <img src={help} alt="help" />
              Help
            </Link>
            <Reset />
          </aside>
        </header>
        <Route path="/" component={Insights} exact />
        <Route path="/charts" component={Charts} />
        <Route path="/data" component={Data} />
        <Route path="/help" component={Help} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
