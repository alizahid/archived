import React, { Component } from 'react'

import './index.css'

const uri = process.env.REACT_APP_TMDB_IMAGE_URI

export default class Film extends Component {
	render() {
		return (
			<div className="film">
				<figure
					style={{
						backgroundImage: `url(${uri}/w500/${this.props.image})`
					}}
				/>
				<h3>
					{this.props.name}
				</h3>
				<small>
					{this.props.year}
				</small>
			</div>
		)
	}
}
