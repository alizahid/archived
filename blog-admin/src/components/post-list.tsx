import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Post } from '../lib/types'

interface Props {
  posts: Post[]
}

const Container = styled.aside`
  border-right: 1px solid #ecf0f1;
  min-width: 15em;
  width: 15em;

  a {
    color: #333;
    display: block;
    line-height: 1.4;
    padding: 1em;

    &:hover,
    &.active {
      color: #ff2d55;
    }

    &:hover {
      &:not(:first-child) {
        border-top-color: #ccc;
      }
    }

    &:not(:first-child) {
      border-top: 1px solid #f6f7f8;
    }
  }
`

const PostList: FunctionComponent<Props> = ({ posts }) => {
  return (
    <Container>
      <NavLink to="/posts/new" activeClassName="active">
        New
      </NavLink>
      {posts.map((post, index) => (
        <NavLink
          key={index}
          to={`/posts/${post.slug}`}
          activeClassName="active">
          {post.title}
        </NavLink>
      ))}
    </Container>
  )
}

export default PostList
