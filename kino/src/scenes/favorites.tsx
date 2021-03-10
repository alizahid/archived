import './favorites.scss'

import React, { FunctionComponent } from 'react'

import { Result } from '../components'
import { useStoreState } from '../store'

const Favorites: FunctionComponent = () => {
  const { favorites } = useStoreState(state => state.favorites)

  return (
    <main className="favorites">
      <h1>Favorites</h1>
      <section>
        {favorites.length === 0 && (
          <p>You have no favorite films and that surprises me.</p>
        )}
        {favorites.map((film, index) => (
          <Result key={index} result={film} />
        ))}
      </section>
    </main>
  )
}

export default Favorites
