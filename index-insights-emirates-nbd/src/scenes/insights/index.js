import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setData } from '../../actions'
import { UploadForm } from '../../components'

import './index.css'

class Insights extends Component {
  onData = data => {
    const { setData } = this.props

    setData(data)
  }

  render() {
    const { data } = this.props

    if (data) {
      return <Redirect to="/charts" />
    }

    return (
      <main className="insights">
        <UploadForm onData={this.onData} />
      </main>
    )
  }
}

const mapStateToProps = ({ data: { data } }) => ({
  data
})

const mapDispatchToProps = dispatch => ({
  setData: data => dispatch(setData(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Insights)
