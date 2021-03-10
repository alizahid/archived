import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Spinner, Film, Person } from '../../components'

import './index.css'

export default class Matches extends Component {
	constructor(props) {
		super(props)

		this._alive = true

		let one = props.match.params.one.split('-').shift()
		let two = props.match.params.two.split('-').shift()

		this.state = {
			loading: true,
			one,
			two
		}

		if (one && two) {
			fetch(`${process.env.REACT_APP_API_URI}/matches/${one}/${two}`)
				.then(data => data.json())
				.then(
					results =>
						this._alive &&
						this.setState({
							loading: false,
							results
						})
				)
		}
	}

	componentWillUnmount() {
		this._alive = false
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				component="main"
				className="matches"
				transitionName="fade"
				transitionEnterTimeout={200}
				transitionLeaveTimeout={200}
			>
				{this.state.loading && <Spinner />}
				{!this.state.loading &&
					<div>
						<div className="people">
							{this.state.results.people.map(person =>
								<Person key={person.name} {...person} />
							)}
						</div>
						<hr />
						<div className="films">
							{this.state.results.films.map(film =>
								<Film key={film.name} {...film} />
							)}
						</div>
					</div>}
				{!this.state.loading &&
					this.state.results.films.length === 0 &&
					<p>Nothing found</p>}
			</ReactCSSTransitionGroup>
		)
	}
}
