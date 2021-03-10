import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { ProjectForm } from '../components'

const ProjectNew: FunctionComponent<RouteComponentProps> = ({
  history: { push }
}) => <ProjectForm onNew={id => push(`/projects/${id}`)} />

export default ProjectNew
