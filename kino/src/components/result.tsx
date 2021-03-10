import './result.scss'

import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { Result as IResult } from '../store/models'

const { REACT_APP_POSTER_URI } = process.env

interface Props {
  result: IResult
}

const Result: FunctionComponent<Props> = ({
  result: { id, poster_path, release_date, title, vote_average }
}) => {
  return (
    <Link className="result" to={`/films/${id}`}>
      <figure
        style={{
          backgroundImage: `url(${REACT_APP_POSTER_URI}/${poster_path})`
        }}
      />
      <h3>{title}</h3>
      <footer>
        <span className="release-date">{moment(release_date).get('year')}</span>
        <span className="rating">{vote_average}</span>
      </footer>
    </Link>
  )
}

export default Result
