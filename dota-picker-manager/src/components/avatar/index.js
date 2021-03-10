import React, { Component } from 'react'

import './index.css'

export default class Avatar extends Component {
  render() {
    const { id, size } = this.props

    const styles = ['avatar', size || 'large']

    return (
      <figure className={styles.join(' ')}>
        <img
          src={`http://cdn.dota2.com/apps/dota2/images/heroes/${id}_full.png`}
          alt={id}
        />
      </figure>
    )
  }
}
