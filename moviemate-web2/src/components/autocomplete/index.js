import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import debounce from 'lodash/debounce'
import kebabCase from 'lodash/kebabCase'

import TextBox from '../textbox'
import Spinner from '../spinner'

import './index.css'

import avatar from '../../assets/avatar.png'

export default class AutoComplete extends Component {
	constructor() {
		super()

		this.state = {
			results: null,
			value: ''
		}

		this.onChange = this.onChange.bind(this)

		this.search = debounce(value => this._search(value), 300)
	}

	onChange(value) {
		if (value.length > 2) {
			this.setState({ open: true, loading: true, value })

			this.search(value)
		} else {
			this.setState({ open: false, results: null, value })
		}
	}

	onClick(result) {
		this.setState({ open: false, results: null, value: result.label })

		this.props.onSelect(result)
	}

	_search(value) {
		return fetch(`${process.env.REACT_APP_API_URI}/search?query=${value}`)
			.then(response => response.json())
			.then(data => data.results)
			.then(results =>
				results.map(result => ({
					...result,
					label: result.name,
					value: kebabCase(result.name),
					image: result.image
						? `${process.env.REACT_APP_TMDB_IMAGE_URI}/h632/${result.image}`
						: avatar
				}))
			)
			.then(results => this.setState({ loading: false, results }))
	}

	render() {
		return (
			<div className="autocomplete">
				<TextBox
					{...this.props}
					className={this.state.results ? 'focus' : ''}
					type="search"
					value={this.state.value}
					onChange={this.onChange}
				/>
				<ReactCSSTransitionGroup
					transitionName="fade"
					transitionEnterTimeout={200}
					transitionLeaveTimeout={200}
				>
					{this.state.open &&
						<div className="results">
							<ul>
								{this.state.loading &&
									<li className="loading">
										<Spinner />
									</li>}
								{!this.state.loading &&
									this.state.results &&
									this.state.results.map(result =>
										<li key={result.value} onClick={() => this.onClick(result)}>
											<figure
												style={{
													backgroundImage: `url(${result.image})`
												}}
											/>
											<span>
												{result.label}
											</span>
										</li>
									)}
								{!this.state.loading &&
									this.state.results.length === 0 &&
									<li className="static">Nothing found</li>}
							</ul>
						</div>}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}
