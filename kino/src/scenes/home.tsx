import './home.scss'

import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const Home: FunctionComponent = () => {
  return (
    <main className="home">
      <h1>Welcome to Kino Cinemas.</h1>
      <p>
        Try searching for <Link to="/search?query=avengers">Avengers</Link>
        &#160;or&#160;
        <Link to="/search?query=godfather">Godfather</Link>.
      </p>
    </main>
  )
}

export default Home
