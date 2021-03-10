import React, { Component } from 'react'

import './index.css'

const uri = process.env.REACT_APP_TMDB_IMAGE_URI

export default class Person extends Component {
	render() {
		return (
			<div className="person">
				<figure
					style={{
						backgroundImage: `url(${uri}/h632/${this.props.image})`
					}}
				/>
				<h3>
					{this.props.name}
				</h3>
			</div>
		)
	}
}
