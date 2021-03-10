import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'promise-polyfill'
import 'whatwg-fetch'

import {} from 'dotenv/config'

import App from './app'

import registerServiceWorker from './registerServiceWorker'

import './index.css'

if (!window.Promise) {
	window.Promise = Promise
}

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
