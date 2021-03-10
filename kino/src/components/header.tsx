import './header.scss'

import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import img_kino from '../assets/kino.svg'
import img_star from '../assets/star.svg'
import Search from './search'

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <Link className="kino" to="/">
        <img src={img_kino} alt="Kino Cinemas" />
      </Link>
      <Search />
      <Link className="favorites" to="/favorites">
        <img src={img_star} alt="Favorites" />
        Favorites
      </Link>
    </header>
  )
}

export default Header
