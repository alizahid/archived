import './results.scss'

import React, { FunctionComponent, useEffect } from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import { Loading, Result } from '../components'
import { useStoreActions, useStoreState } from '../store'

const Results: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const { search } = useStoreActions(actions => actions.results)
  const { loading, results } = useStoreState(state => state.results)

  const params = new URLSearchParams(location.search.slice(1))

  const query = params.get('query')

  useEffect(() => {
    if (query) {
      search(query)
    }
  }, [query, search])

  if (!query) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className="results">
      <h1>Search results for &#34;{query}&#34;</h1>
      <section>
        {results.length === 0 && <p>Nothing found.</p>}
        {results.map((result, index) => (
          <Result key={index} result={result} />
        ))}
      </section>
    </main>
  )
}

export default Results
