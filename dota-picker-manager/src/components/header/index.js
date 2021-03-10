import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import './index.css'

import logo from '../../assets/dota.svg'

class Header extends Component {
  state = {
    expanded: false,
    filter: {
      roles: []
    }
  }

  componentDidMount() {
    this.updateHeight()
  }

  componentDidUpdate() {
    this.updateHeight()
  }

  updateHeight() {
    const root = document.getElementById('root')
    const header = document.getElementById('header')

    if (root && header) {
      const height = header.clientHeight

      root.style.paddingTop = `${height}px`
    }
  }

  expandFilter = event => {
    event.preventDefault()

    const { expanded } = this.state

    this.setState({
      expanded: !expanded
    })
  }

  clearFilter = event => {
    event.preventDefault()

    this.setState({
      filter: {
        roles: []
      }
    })

    document.getElementById('search').value = null
    document.getElementById('filterAttribute').selectedIndex = 0
    document.getElementById('filterAttack').selectedIndex = 0

    for (const checkbox of document.getElementsByClassName('checkbox')) {
      checkbox.children[0].checked = false
    }

    this.updateStore({
      roles: []
    })
  }

  updateFilter(props) {
    let { filter } = this.state

    filter = {
      ...filter,
      ...props
    }

    this.setState({
      filter
    })

    this.updateStore(filter)

    const { history, location } = this.props

    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  updateStore(filter) {
    const { heroes } = this.props

    heroes.setFilter(filter)
  }

  onChangeQuery = event => {
    this.updateFilter({
      query: event.target.value
    })
  }

  onChangeAttribute = event => {
    this.updateFilter({
      attribute: event.target.value
    })
  }

  onChangeAttack = event => {
    this.updateFilter({
      attack: event.target.value
    })
  }

  onChangeRole = event => {
    const { checked, value } = event.target

    const { filter } = this.state

    const { roles } = filter

    const index = roles.findIndex(role => role === value)

    if (checked && index < 0) {
      roles.push(value)
    } else if (index >= 0) {
      roles.splice(index, 1)
    }

    this.updateFilter({
      roles
    })
  }

  focusSearch = () => {
    document.getElementById('search').focus()
  }

  logout = () => {
    const { auth } = this.props

    auth.logout()
  }

  render() {
    const { admin, auth } = this.props.auth
    const { expanded } = this.state

    return (
      <header id="header">
        <Link to="/">
          <img src={logo} alt="Dota Picker" />
          <h1>Dota Picker</h1>
        </Link>
        <form>
          <section>
            <input
              id="search"
              type="search"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Search"
              onChange={this.onChangeQuery}
            />
            <button
              className={expanded ? 'open' : ''}
              onClick={this.expandFilter}
            />
            <button onClick={this.clearFilter} />
          </section>
          <section className={expanded ? 'open' : ''}>
            <select id="filterAttribute" onChange={this.onChangeAttribute}>
              <option value="">Primary attribute</option>
              <option value="strength">Strength</option>
              <option value="agility">Agility</option>
              <option value="intelligence">Intelligence</option>
            </select>
            <select id="filterAttack" onChange={this.onChangeAttack}>
              <option value="">Attack type</option>
              <option value="melee">Melee</option>
              <option value="ranged">Ranged</option>
            </select>
          </section>
          <section className={expanded ? 'open' : ''}>
            <label className="checkbox">
              <input
                type="checkbox"
                value="carry"
                onChange={this.onChangeRole}
              />
              Carry
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="disabler"
                onChange={this.onChangeRole}
              />
              Disabler
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="initiator"
                onChange={this.onChangeRole}
              />
              Initiator
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="jungler"
                onChange={this.onChangeRole}
              />
              Jungler
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="support"
                onChange={this.onChangeRole}
              />
              Support
            </label>
          </section>
          <section className={expanded ? 'open' : ''}>
            <label className="checkbox">
              <input
                type="checkbox"
                value="durable"
                onChange={this.onChangeRole}
              />
              Durable
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="nuker"
                onChange={this.onChangeRole}
              />
              Nuker
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="pusher"
                onChange={this.onChangeRole}
              />
              Pusher
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                value="escape"
                onChange={this.onChangeRole}
              />
              Escape
            </label>
          </section>
        </form>
        {!auth && (
          <nav>
            <Link to="/login" className="login" />
          </nav>
        )}
        {auth && (
          <nav>
            {admin && <Link to="/users" className="users" />}
            <Link to="/logs" className="logs" />
            <Link to="/settings" className="settings" />
            <button className="logout" onClick={this.logout} />
          </nav>
        )}
      </header>
    )
  }
}

export default withRouter(inject('auth', 'heroes')(observer(Header)))
