import './index.scss'

import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import { Header } from './components'
import { Auth, Posts, Projects } from './scenes'
import * as serviceWorker from './serviceWorker'

const Blog: FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Route path="/" exact component={Auth} />
    <Route path="/posts" component={Posts} />
    <Route path="/projects" component={Projects} />
  </BrowserRouter>
)

ReactDOM.render(<Blog />, document.getElementById('root'))

serviceWorker.unregister()
