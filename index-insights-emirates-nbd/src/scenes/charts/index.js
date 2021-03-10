import React, { Component } from 'react'
import { merge } from 'lodash'
import { Bar, Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Nav } from '../../components'
import { convertData } from '../../lib'

import './index.css'

class Charts extends Component {
  state = {
    chart: 'spending',
    options: {
      legend: {
        labels: {
          boxWidth: 12
        },
        position: 'right'
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              callback: value => `${value / 1000}k`
            }
          }
        ]
      }
    }
  }

  onSubmit = event => event.preventDefault()

  changeChart = chart => {
    this.setState({
      chart
    })
  }

  render() {
    const { data } = this.props
    const { chart, options } = this.state

    if (!data) {
      return <Redirect to="/" />
    }

    const charts = [
      {
        label: 'Spending',
        value: 'spending'
      },
      {
        label: 'Balance',
        value: 'balance'
      }
    ]

    const chartData = convertData(data, chart)
    const chartOptions = merge(options, chartData.options)

    return (
      <main className="charts">
        <Nav />
        <section>
          <form onSubmit={this.onSubmit}>
            {charts.map(({ label, value }) => (
              <button
                key={value}
                className={chart === value ? 'current' : ''}
                onClick={() => this.changeChart(value)}
              >
                {label}
              </button>
            ))}
          </form>
          <figure>
            {['spending'].includes(chart) && (
              <Bar data={chartData} options={chartOptions} />
            )}
            {['balance'].includes(chart) && (
              <Line data={chartData} options={chartOptions} />
            )}
          </figure>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ data: { data } }) => ({
  data
})

export default connect(mapStateToProps)(Charts)
