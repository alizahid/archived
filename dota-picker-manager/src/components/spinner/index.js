import React, { Component } from 'react'

import './index.css'

export default class Spinner extends Component {
  render() {
    const { button, size } = this.props

    const styles = ['spinner', size || 'small']

    if (button) {
      styles.push('button')
    }

    return <div className={styles.join(' ')} />
  }
}
