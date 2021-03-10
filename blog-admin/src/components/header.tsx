import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.header`
  align-items: center;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  padding: 1em;
`

const Nav = styled.nav`
  a {
    color: #999;

    &:not(:first-child) {
      margin-left: 1em;
    }

    &.active {
      color: #ff2d55;
    }
  }
`

const Header: FunctionComponent = () => {
  return (
    <Container>
      <Nav>
        <NavLink to="/posts" activeClassName="active">
          Posts
        </NavLink>
        <NavLink to="/projects" activeClassName="active">
          Projects
        </NavLink>
      </Nav>
    </Container>
  )
}

export default Header
