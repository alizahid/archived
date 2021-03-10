import React, { FunctionComponent, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'

import { Project } from '../lib/types'

interface Props {
  project?: Project

  onNew?: (slug: string) => void
  onRemove?: () => void
}

const Editor = styled.section`
  flex: 1;
  height: 100%;
  overflow: auto;
  padding: 1em 2em;
`

const Content = styled.div`
  display: flex;

  label {
    flex: 1;

    textarea {
      height: 100%;
      min-height: 20em;
      resize: none;
    }
  }
`

const Preview = styled.div`
  flex: 1;
  margin: 1em 0 1em 2em;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  blockquote {
    color: #bdc3c7;
    text-align: center;
  }
`

const SideBar = styled.aside`
  border-left: 1px solid #ecf0f1;
  overflow: auto;
  padding: 1em 2em;
  width: 20em;

  h3 {
    font-size: 1em;
    font-weight: 500;
  }
`

const Links = styled.ul`
  margin: 1em 0;

  li {
    list-style: none;
    margin: 1em 0;

    span {
      color: #ff2d55;
      cursor: pointer;
    }

    a {
      color: #333;
    }
  }
`

const ProjectForm: FunctionComponent<Props> = ({
  project,
  onNew,
  onRemove
}) => {
  const [id, setId] = useState('')
  const [description, setDescription] = useState('')
  const [links, setLinks] = useState<Project['links']>([])
  const [name, setName] = useState('')
  const [order, setOrder] = useState(1)

  const [label, setLabel] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (project) {
      const {
        _id: { $oid },
        description,
        links,
        name,
        order: { $numberDouble }
      } = project

      setId($oid)
      setDescription(description)
      setLinks(links)
      setName(name)
      setOrder(Number($numberDouble))
    }
  }, [project])

  const save = async () => {
    const uri =
      process.env.REACT_APP_URI +
      (project
        ? `/updateProject?id=${id}&secret=${localStorage.getItem('@key')}`
        : `/createProject?secret=${localStorage.getItem('@key')}`)

    const response = await fetch(uri, {
      method: project ? 'PUT' : 'POST',
      body: JSON.stringify({
        description,
        links,
        name,
        order
      })
    })

    const json: { project: Project } = await response.json()

    if (project) {
      alert('Project updated')
    } else if (onNew) {
      onNew(json.project._id.$oid)
    }
  }

  const remove = async () => {
    const yes = window.confirm('Are you sure?')

    if (yes) {
      await fetch(
        process.env.REACT_APP_URI +
          `/deleteProject?id=${id}&secret=${localStorage.getItem('@key')}`,
        {
          method: 'DELETE'
        }
      )

      if (onRemove) {
        onRemove()
      }
    }
  }

  return (
    <>
      <Editor>
        <form onSubmit={event => event.preventDefault()}>
          <label>
            <span>Name</span>
            <input
              onChange={event => setName(event.target.value)}
              placeholder="Name"
              type="text"
              value={name}
            />
          </label>
          <Content>
            <label>
              <textarea
                onChange={event => setDescription(event.target.value)}
                placeholder="Description"
                value={description}
              />
            </label>
            <Preview>
              <Markdown
                source={description}
                transformImageUri={() => '/placeholder.png'}
              />
            </Preview>
          </Content>
        </form>
      </Editor>
      <SideBar>
        <form onSubmit={event => event.preventDefault()}>
          <p>
            <button onClick={save}>Save</button>
          </p>
          {Boolean(project) && (
            <p>
              <a
                href="#delete"
                onClick={event => {
                  event.preventDefault()

                  remove()
                }}>
                Delete project
              </a>
            </p>
          )}
          <hr />
          <label>
            <span>Order</span>
            <input
              onChange={event => setOrder(Number(event.target.value))}
              placeholder="Order"
              type="number"
              value={String(order)}
            />
          </label>
          <hr />
          <h3>Links</h3>
          {links && (
            <Links>
              {links.map(({ label, link }, index) => (
                <li key={index}>
                  <span
                    onClick={() => {
                      const copy = [...links]

                      copy.splice(index, 1)

                      setLinks(copy)
                    }}>
                    &#10007;
                  </span>
                  &nbsp;
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </Links>
          )}
          <label>
            <input
              onChange={event => setLabel(event.target.value)}
              placeholder="Label"
              type="text"
              value={label}
            />
          </label>
          <label>
            <input
              onChange={event => setLink(event.target.value)}
              placeholder="Link"
              type="text"
              value={link}
            />
          </label>
          <p>
            <button
              onClick={event => {
                event.preventDefault()

                if (label && link) {
                  const copy = [...links]

                  copy.push({
                    label,
                    link
                  })

                  setLinks(copy)

                  setLabel('')
                  setLink('')
                }
              }}>
              Add
            </button>
          </p>
        </form>
      </SideBar>
    </>
  )
}

export default ProjectForm
