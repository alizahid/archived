import './crew.scss'

import React, { FunctionComponent } from 'react'

import { Crew as ICrew } from '../store/models'

const { REACT_APP_POSTER_URI } = process.env

interface Props {
  crew: ICrew
}

const Crew: FunctionComponent<Props> = ({ crew }) => {
  return (
    <article className="crew">
      <figure
        style={{
          backgroundImage: `url(${REACT_APP_POSTER_URI + crew.profile_path})`
        }}
      />
      <h3>{crew.name}</h3>
      <p>{crew.job}</p>
    </article>
  )
}

export default Crew
