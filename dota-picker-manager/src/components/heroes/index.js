import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Overlay } from '../'

import './index.css'

export default class Heroes extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    const { filter } = this.props

    this.filterHeroes(filter)
  }

  componentWillReceiveProps(props) {
    const { filter } = props

    this.filterHeroes(filter)
  }

  filterHeroes(filter) {
    const { heroes } = this.props

    const { query, attribute, attack, roles } = filter

    let data = heroes.filter(({ name }) => {
      const regex = new RegExp(query, 'i')

      return regex.test(name)
    })

    if (attribute) {
      data = data.filter(hero => hero.attribute === attribute)
    }

    if (attack) {
      data = data.filter(hero => hero.attack === attack)
    }

    if (roles.length > 0) {
      data = data.filter(hero => roles.every(role => hero.roles.includes(role)))
    }

    this.setState({
      data
    })
  }

  renderItem = ({ id, name }) => {
    return (
      <Link key={id} to={`/heroes/${id}`}>
        <Avatar id={id} size="small" />
      </Link>
    )
  }

  render() {
    const { loading } = this.props
    const { data } = this.state

    const strength = data.filter(hero => hero.attribute === 'strength')
    const agility = data.filter(hero => hero.attribute === 'agility')
    const intelligence = data.filter(hero => hero.attribute === 'intelligence')

    return (
      <div className="heroes">
        {strength.length > 0 && (
          <section>
            <header>
              <h2>Strength</h2>
            </header>
            <div>{strength.map(this.renderItem)}</div>
          </section>
        )}
        {agility.length > 0 && (
          <section>
            <header>
              <h2>Agility</h2>
            </header>
            <div>{agility.map(this.renderItem)}</div>
          </section>
        )}
        {intelligence.length > 0 && (
          <section>
            <header>
              <h2>Intelligence</h2>
            </header>
            <div>{intelligence.map(this.renderItem)}</div>
          </section>
        )}
        {!loading && data.length === 0 && <Overlay template="filters" />}
        {loading && <Overlay template="loading" />}
      </div>
    )
  }
}
