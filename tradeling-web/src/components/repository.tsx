import {
  CodeIcon,
  GitForkIcon,
  PersonIcon,
  StarIcon
} from '@primer/octicons-react'
import pluralize from 'pluralize'
import React, { FunctionComponent } from 'react'

import { Repository } from '../types'
import styles from './repository.module.scss'

interface Props {
  repository: Repository
}

export const RepositoryCard: FunctionComponent<Props> = ({ repository }) => {
  const [user, name] = repository.name.split('/')

  return (
    <article className={styles.repository}>
      <div>
        <img alt={repository.owner.login} src={repository.owner.avatar} />
        <div>
          <h2>{name}</h2>
          {repository.description && <p>{repository.description}</p>}
          <footer>
            <div>
              <StarIcon /> {pluralize('star', repository.stars, true)}
            </div>
            <div>
              <GitForkIcon /> {pluralize('fork', repository.forks, true)}
            </div>
            {repository.language && (
              <div>
                <CodeIcon /> {repository.language}
              </div>
            )}
            <div>
              <PersonIcon /> {user}
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
