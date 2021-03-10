import './cast.scss'

import React, { FunctionComponent } from 'react'

import { Cast as ICast } from '../store/models'

const { REACT_APP_POSTER_URI } = process.env

interface Props {
  cast: ICast
}

const Cast: FunctionComponent<Props> = ({ cast }) => {
  return (
    <article className="cast">
      <figure
        style={{
          backgroundImage: `url(${REACT_APP_POSTER_URI + cast.profile_path})`
        }}
      />
      <h3>{cast.name}</h3>
      <p>{cast.character}</p>
    </article>
  )
}

export default Cast
