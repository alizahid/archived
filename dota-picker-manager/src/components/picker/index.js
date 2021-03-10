import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Avatar } from '../'

import './index.css'

class Picker extends Component {
  state = {
    data: [],
    query: ''
  }

  componentWillMount() {
    this.searchHeroes()
  }

  onChangeQuery = event => {
    const query = event.target.value

    this.searchHeroes(query)
  }

  searchHeroes(query = '') {
    const { exclude, heroes } = this.props

    let data = heroes.findHeroes(query)

    if (exclude) {
      data = data.filter(
        hero => !exclude.find(exclude => exclude.id === hero.id)
      )
    }

    this.setState({
      data,
      query
    })
  }

  render() {
    const { onPick } = this.props
    const { data, query } = this.state

    return (
      <div className="picker">
        <input
          type="search"
          onChange={this.onChangeQuery}
          placeholder="Search"
        />
        {query.length > 0 && data.length === 0 && <p>Nothing found</p>}
        <ul>
          {data.map(hero => (
            <li key={hero.id} onClick={() => onPick(hero)}>
              <Avatar id={hero.id} size="tiny" />
              {hero.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default inject('heroes')(observer(Picker))
