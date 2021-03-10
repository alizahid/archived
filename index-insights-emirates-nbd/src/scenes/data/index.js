import React, { Component } from 'react'
import { capitalize } from 'lodash'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { categories, ui } from '../../assets'
import { Nav } from '../../components'
import { utils } from '../../lib'

import './index.css'

const { up, down } = ui
const { formatCurrency } = utils

class Table extends Component {
  state = {
    data: [],
    query: ''
  }

  componentDidMount() {
    const { data } = this.props

    this.setState({
      data
    })
  }

  onChange = event => {
    const {
      target: { value: query }
    } = event

    this.setState({
      query
    })

    this.filter(query)
  }

  filterByCategory = (event, category) => {
    event.preventDefault()

    const query = `category:${category}`

    this.setState({
      query
    })

    this.filter(query)
  }

  filter = query => {
    const { data } = this.props

    let key
    let value

    query = query.split(':')

    if (query.length > 1) {
      key = query.shift()
      value = query.pop()
    } else {
      key = 'description'
      value = query.pop()
    }

    const regex = new RegExp(value, 'gi')

    this.setState({
      data: data.filter(item => regex.test(item[key]))
    })
  }

  cashStyle = amount => {
    return amount > 0 ? 'green' : 'red'
  }

  renderDifference = index => {
    const { data } = this.state

    const current = data[index]
    const previous = data[index + 1]

    if (current && previous) {
      if (current.balance > previous.balance) {
        return <img src={up} alt="up" />
      } else {
        return <img src={down} alt="down" />
      }
    }

    return null
  }

  render() {
    const { data, query } = this.state

    if (!data) {
      return <Redirect to="/" />
    }

    return (
      <main className="table">
        <Nav />
        <section>
          <form>
            <label>
              <input
                type="search"
                placeholder="Filter"
                value={query}
                onChange={this.onChange}
              />
            </label>
          </form>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th data-cash>Amount</th>
                <th data-cash>Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (
                  { date, description, category, debit, credit, balance },
                  index
                ) => (
                  <tr key={index}>
                    <td>{date.format('L')}</td>
                    <td>{description}</td>
                    <td data-icon-left>
                      <a
                        href={`#category=${category}`}
                        onClick={event =>
                          this.filterByCategory(event, category)
                        }
                      >
                        <img src={categories[category]} alt={category} />
                        {capitalize(category)}
                      </a>
                    </td>
                    <td
                      className={this.cashStyle(credit || debit || 0)}
                      data-cash
                    >
                      {formatCurrency(credit || debit || 0)}
                    </td>
                    <td data-cash data-icon-right>
                      {formatCurrency(balance)}
                      {this.renderDifference(index)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ data: { data } }) => ({
  data
})

export default connect(mapStateToProps)(Table)
