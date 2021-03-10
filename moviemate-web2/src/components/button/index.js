import React, { Component } from 'react'

import './index.css'

export default class Button extends Component {
	render() {
		return (
			<button
				type="button"
				className="button"
				onClick={() => this.props.onClick()}
			>
				{this.props.label}
			</button>
		)
	}
}
