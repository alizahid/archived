import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Project } from '../lib/types'

interface Props {
  projects: Project[]
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

const ProjectList: FunctionComponent<Props> = ({ projects }) => {
  return (
    <Container>
      <NavLink to="/projects/new" activeClassName="active">
        New
      </NavLink>
      {projects.map((post, index) => (
        <NavLink
          key={index}
          to={`/projects/${post._id.$oid}`}
          activeClassName="active">
          {post.name}
        </NavLink>
      ))}
    </Container>
  )
}

export default ProjectList
