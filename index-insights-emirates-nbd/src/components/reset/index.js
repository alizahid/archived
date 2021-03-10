import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { removeData } from '../../actions'
import { ui } from '../../assets'

const { trash } = ui

class Reset extends Component {
  onClick = event => {
    event.preventDefault()

    const { removeData } = this.props

    removeData()
  }

  render() {
    const { data } = this.props

    if (!data) {
      return <Redirect to="/" />
    }

    return (
      <a href="#reset" onClick={this.onClick}>
        <img src={trash} alt="reset" />
        Clear
      </a>
    )
  }
}

const mapStateToProps = ({ data: { data } }) => ({
  data
})

const mapDispatchToProps = dispatch => ({
  removeData: () => dispatch(removeData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reset)
