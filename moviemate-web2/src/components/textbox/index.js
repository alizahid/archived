import React, { Component } from 'react'

import './index.css'

export default class TextBox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: props.value || ''
		}

		this.onChange = this.onChange.bind(this)
	}

	componentWillReceiveProps(props) {
		let { value } = props

		this.setState({ value })
	}

	onChange(e) {
		this.setState({ value: e.target.value })

		this.props.onChange(e.target.value)
	}

	render() {
		return (
			<input
				{...this.props}
				className={`textbox ${this.props.className}`}
				type={this.props.type || 'text'}
				placeholder={this.props.placeholder}
				value={this.state.value}
				onChange={this.onChange}
			/>
		)
	}
}
