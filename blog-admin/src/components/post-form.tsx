import kebabCase from 'lodash.kebabcase'
import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'

import { Post } from '../lib/types'

interface Props {
  post?: Post

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

const Tags = styled.ul`
  margin: 1em 0;

  li {
    list-style: none;
    margin: 1em 0;

    span {
      color: #ff2d55;
      cursor: pointer;
    }
  }
`

const AddTag = styled.div`
  display: flex;

  input {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`

const PostForm: FunctionComponent<Props> = ({ post, onNew, onRemove }) => {
  const [id, setId] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [published, setPublished] = useState('')
  const [slug, setSlug] = useState('')
  const [tags, setTags] = useState<Post['tags']>([])
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (post) {
      const { _id, content, excerpt, published, slug, tags, title } = post

      setId(_id.$oid)
      setContent(content)
      setExcerpt(excerpt)
      setPublished(moment(Number(published.$date.$numberLong)).toISOString())
      setSlug(slug)
      setTags(tags)
      setTitle(title)
    }
  }, [post])

  useEffect(() => {
    if (!post) {
      setSlug(kebabCase(title))
    }
  }, [post, title])

  const save = async () => {
    const uri =
      process.env.REACT_APP_URI +
      (post
        ? `/updatePost?id=${id}&secret=${localStorage.getItem('@key')}`
        : `/createPost?secret=${localStorage.getItem('@key')}`)

    await fetch(uri, {
      method: post ? 'PUT' : 'POST',
      body: JSON.stringify({
        content,
        excerpt,
        published,
        slug,
        tags,
        title
      })
    })

    if (post) {
      alert('Post updated')
    } else if (onNew) {
      onNew(slug)
    }
  }

  const remove = async () => {
    const yes = window.confirm('Are you sure?')

    if (yes) {
      await fetch(
        process.env.REACT_APP_URI +
          `/deletePost?id=${id}&secret=${localStorage.getItem('@key')}`,
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
            <span>Slug</span>
            <input
              onChange={event => setSlug(event.target.value)}
              placeholder="Slug"
              type="text"
              value={slug}
            />
          </label>
          <label>
            <span>Title</span>
            <input
              onChange={event => setTitle(event.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
          </label>
          <label>
            <span>Excerpt</span>
            <textarea
              onChange={event => setExcerpt(event.target.value)}
              placeholder="Excerpt"
              value={excerpt}
            />
          </label>
          <Content>
            <label>
              <textarea
                onChange={event => setContent(event.target.value)}
                placeholder="Content"
                value={content}
              />
            </label>
            <Preview>
              <Markdown
                source={content}
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
          {Boolean(post) && (
            <p>
              <a
                href="#delete"
                onClick={event => {
                  event.preventDefault()

                  remove()
                }}>
                Delete post
              </a>
            </p>
          )}
          <hr />
          <label>
            <span>Published</span>
            <input
              onChange={event => setPublished(event.target.value)}
              placeholder="Published"
              type="text"
              value={published}
            />
          </label>
          <hr />
          <h3>Tags</h3>
          {tags && (
            <Tags>
              {tags.map((tag, index) => (
                <li key={index}>
                  <span
                    onClick={() => {
                      const copy = [...tags]

                      copy.splice(index, 1)

                      setTags(copy)
                    }}>
                    &#10007;
                  </span>
                  &nbsp;{tag}
                </li>
              ))}
            </Tags>
          )}
          <AddTag>
            <input
              onChange={event => setTag(event.target.value)}
              placeholder="New tag"
              type="text"
              value={tag}
            />
            <button
              onClick={event => {
                event.preventDefault()

                if (tag) {
                  const copy = [...tags]

                  copy.push(tag)

                  setTags(copy)
                  setTag('')
                }
              }}>
              Add
            </button>
          </AddTag>
        </form>
      </SideBar>
    </>
  )
}

export default PostForm
