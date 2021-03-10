import 'whatwg-fetch'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { auth, heroes, users } from './stores'

import registerServiceWorker from './registerServiceWorker'

import { Header, ScrollToTop } from './components'
import { Hero, Login, Logs, Main, Settings, Users } from './scenes'

import './styles/index.css'

class DotaPicker extends Component {
  render() {
    return (
      <Provider auth={auth} heroes={heroes} users={users}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <ScrollToTop>
            <Header />

            <Route exact path="/" component={Main} />
            <Route path="/heroes/:id" component={Hero} />
            <Route path="/logs" component={Logs} />
            <Route path="/users" component={Users} />
            <Route path="/settings" component={Settings} />

            <Route path="/login" component={Login} />
          </ScrollToTop>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<DotaPicker />, document.getElementById('root'))

registerServiceWorker()
