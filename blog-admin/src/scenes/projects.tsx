import React, { FunctionComponent, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { ProjectList } from '../components'
import { Project } from '../lib/types'
import ProjectEdit from './project-edit'
import ProjectNew from './project-new'

const Container = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const Projects: FunctionComponent = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(process.env.REACT_APP_URI + '/projects')

      const { projects } = await response.json()

      setProjects(projects)
    })()
  }, [])

  return (
    <Container>
      <ProjectList projects={projects} />
      <Switch>
        <Route path="/projects/new" exact component={ProjectNew} />
        <Route path="/projects/:id" component={ProjectEdit} />
      </Switch>
    </Container>
  )
}

export default Projects
