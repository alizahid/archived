import './film.scss'

import moment from 'moment'
import React, { FunctionComponent, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import { Cast, Crew, Loading } from '../components'
import { useStoreActions, useStoreState } from '../store'
import { Film as IFilm } from '../store/models'

const { REACT_APP_BACKDROP_URI, REACT_APP_IMDB_URI } = process.env

interface Props {
  id: string
}

const Film: FunctionComponent<RouteComponentProps<Props>> = ({
  match: {
    params: { id }
  }
}) => {
  const { toggle } = useStoreActions(actions => actions.favorites)
  const { fetch } = useStoreActions(actions => actions.films)
  const { favorites } = useStoreState(state => state.favorites)
  const { loading, films } = useStoreState(state => state.films)

  useEffect(() => {
    fetch(Number(id))
  }, [id, fetch])

  if (loading) {
    return <Loading />
  }

  const film: IFilm = films[id]

  if (!film) {
    return null
  }

  const hero = film.backdrop_path
    ? REACT_APP_BACKDROP_URI + film.backdrop_path
    : 'https://source.unsplash.com/random/1600x900'

  const isFavorite = Boolean(
    favorites.find(favorite => favorite.id === film.id)
  )

  return (
    <main className="film">
      <header>
        <figure
          style={{
            backgroundImage: `url(${hero})`
          }}
        >
          <figcaption>
            <h1>{film.title}</h1>
            <h3>{film.tagline}</h3>
            <p>{film.overview}</p>
          </figcaption>
        </figure>
      </header>
      <section>
        <div>
          <h2>Top Cast</h2>
          <div className="film-cast">
            {film.cast.slice(0, 10).map((cast, index) => (
              <Cast key={index} cast={cast} />
            ))}
          </div>
          <h2>Top Crew</h2>
          <div className="film-crew">
            {film.crew.slice(0, 5).map((crew, index) => (
              <Crew key={index} crew={crew} />
            ))}
          </div>
        </div>
        <aside>
          <button className="favorite" onClick={() => toggle(film)}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <hr />
          <h3>Release date</h3>
          <p>{moment(film.release_date).format('l')}</p>
          <h3>Runtime</h3>
          <p>{film.runtime} minutes</p>
          <h3>Budget</h3>
          <p>
            {film.budget.toLocaleString('en-US', {
              currency: 'USD',
              style: 'currency'
            })}
          </p>
          <h3>Revenue</h3>
          <p>
            {film.revenue.toLocaleString('en-US', {
              currency: 'USD',
              style: 'currency'
            })}
          </p>
          <h3>Status</h3>
          <p>{film.status}</p>
          <h3>Rating</h3>
          <p>
            {film.vote_average} / {film.vote_count.toLocaleString('en-US')}
          </p>
          <h3>Meta</h3>
          {Boolean(film.homepage) && (
            <p>
              <a href={film.homepage}>View on web</a>
            </p>
          )}
          <p>
            <a href={REACT_APP_IMDB_URI + film.imdb_id}>View on IMDb</a>
          </p>
        </aside>
      </section>
    </main>
  )
}

export default Film
