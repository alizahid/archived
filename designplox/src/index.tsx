import React from 'react'
import ReactDOM from 'react-dom'

import Home from './home'

import * as serviceWorker from './serviceWorker'

import './index.scss'

ReactDOM.render(<Home />, document.getElementById('root'))

serviceWorker.unregister()
