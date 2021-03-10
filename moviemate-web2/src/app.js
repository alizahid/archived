import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { Home, Matches } from './scenes'

import './app.css'

import heart from './assets/heart.svg'
import moviemate from './assets/moviemate.svg'

export default class App extends Component {
	render() {
		return (
			<Router>
				<Route
					render={({ location }) =>
						<div>
							<header>
								<Link to="/">
									<img className="logo" src={moviemate} alt="MovieMate" />
								</Link>
							</header>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/:one/:two" component={Matches} />
							</Switch>
							<footer>
								Made with
								<img src={heart} alt="love" />
								by
								<a href="https://designplox.com/">Ali Zahid</a>
							</footer>
						</div>}
				/>
			</Router>
		)
	}
}
