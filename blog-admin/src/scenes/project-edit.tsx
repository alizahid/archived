import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { ProjectForm } from '../components'
import { Project } from '../lib/types'

interface Props {
  id: string
}

const ProjectEdit: FunctionComponent<RouteComponentProps<Props>> = ({
  history: { replace },
  match: {
    params: { id }
  }
}) => {
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(process.env.REACT_APP_URI + '/projects')

      const { projects }: { projects: Project[] } = await response.json()

      const project = projects.find(project => project._id.$oid === id)

      setProject(project)
    })()
  }, [id])

  return <ProjectForm onRemove={() => replace('/projects')} project={project} />
}

export default ProjectEdit
