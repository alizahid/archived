import React, { Component } from 'react'

import { parseFile } from '../../lib'

import './index.css'

export default class UploadForm extends Component {
  state = {
    error: null,
    loading: false
  }

  chooseFile = event => {
    event.preventDefault()

    const { input } = this.refs

    input.click()
  }

  fileChosen = async event => {
    const file = event.target.files.item(0)

    this.setState({
      error: null,
      loading: true
    })

    try {
      const data = await parseFile(file)

      const { onData } = this.props

      onData(data)
    } catch (error) {
      this.setState({
        error,
        loading: false
      })
    }
  }

  render() {
    const { error, loading } = this.state

    return (
      <div className="upload-form">
        <form onSubmit={this.chooseFile}>
          <p>
            Upload the data export from Emirates NBD to get insigts into your
            spending
          </p>
          <label>
            <button onClick={this.chooseFile} disabled={loading}>
              Choose file
            </button>
            {error && <span>{error.message}</span>}
            <input
              ref="input"
              type="file"
              accept=".xml"
              onChange={this.fileChosen}
            />
          </label>
        </form>
      </div>
    )
  }
}
