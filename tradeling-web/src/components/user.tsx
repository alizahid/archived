import {
  GlobeIcon,
  LocationIcon,
  PeopleIcon,
  SmileyIcon
} from '@primer/octicons-react'
import pluralize from 'pluralize'
import React, { FunctionComponent } from 'react'

import { User } from '../types'
import styles from './user.module.scss'

interface Props {
  user: User
}

export const UserCard: FunctionComponent<Props> = ({ user }) => (
  <article className={styles.user}>
    <div>
      <img alt={user.name ?? user.login} src={user.avatar} />
      <div>
        <h2>{user.name ?? user.login}</h2>
        {user.bio && <p>{user.bio}</p>}
        <footer>
          <div>
            <PeopleIcon />
            <div>
              <div>{pluralize('follower', user.followers, true)}</div>
              <div>{`${user.following} following`}</div>
            </div>
          </div>
          {user.location && (
            <div>
              <LocationIcon /> {user.location}
            </div>
          )}
          {user.twitter && (
            <div>
              <SmileyIcon />{' '}
              <a href={`https://twitter.com/${user.twitter}`}>
                @{user.twitter}
              </a>
            </div>
          )}
          {user.blog && (
            <div>
              <GlobeIcon />{' '}
              <a href={user.blog}>
                {user.blog.length > 10 ? 'Blog' : user.blog.split('://').pop()}
              </a>
            </div>
          )}
        </footer>
      </div>
    </div>
  </article>
)
