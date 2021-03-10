import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Heroes } from '../../components'

import './index.css'

class Main extends Component {
  render() {
    const { filter, heroes, loading } = this.props.heroes

    return (
      <div className="main">
        <Heroes heroes={heroes} loading={loading} filter={filter} />
      </div>
    )
  }
}

export default inject('heroes')(observer(Main))
