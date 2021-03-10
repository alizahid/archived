import React, { Component } from 'react'

import { AutoComplete, Button } from '../../components'

import './index.css'

export default class Home extends Component {
	constructor() {
		super()

		this.state = {
			one: null,
			two: null
		}

		this.submit = this.submit.bind(this)
	}

	submit(e) {
		if (e && e.preventDefault) {
			e.preventDefault()
		}

		if (
			this.state.one &&
			this.state.two &&
			this.state.one.value !== this.state.two.value
		) {
			this.props.history.push(
				`/${this.state.one.id}-${this.state.one.value}/${this.state.two
					.id}-${this.state.two.value}`
			)
		}
	}

	render() {
		return (
			<main className="home">
				<form onSubmit={this.submit}>
					<AutoComplete
						className="textbox"
						placeholder="Brad Pitt"
						required
						onSelect={one => this.setState({ one })}
					/>
					<AutoComplete
						className="textbox"
						placeholder="George Clooney"
						required
						onSelect={two => this.setState({ two })}
					/>
					<Button label="Find" onClick={this.submit} />
				</form>
			</main>
		)
	}
}
