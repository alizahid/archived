import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { nav } from '../../assets'

import './index.css'

const { charts, data } = nav

export default class Nav extends Component {
  renderLink = ({ icon, label, link }) => {
    return (
      <NavLink key={label} to={link}>
        <img src={icon} alt={label} />
        <span>{label}</span>
      </NavLink>
    )
  }

  render() {
    const links = [
      {
        icon: charts,
        label: 'Charts',
        link: '/charts'
      },
      {
        icon: data,
        label: 'Data',
        link: '/data'
      }
    ]

    return <nav className="nav">{links.map(this.renderLink)}</nav>
  }
}
