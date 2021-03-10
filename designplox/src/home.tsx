import React, { useEffect, useState } from 'react'
import { RichText } from 'prismic-reactjs'
import get from 'lodash.get'
import sortBy from 'lodash.sortby'

import { ali, dribbble, github, twitter } from './assets'

import './home.scss'

const { REACT_APP_API_URI } = process.env

interface Project {
  excerpt: object
  id: string
  image: string
  links: string[]
  order: number
  title: object
}

const fetchKey = async () => {
  const response = await fetch(`${REACT_APP_API_URI}`)

  const data = await response.json()

  return get(data, 'refs.0.ref')
}

const fetchProjects = async (key: string) => {
  const response = await fetch(
    `${REACT_APP_API_URI}/documents/search?ref=${key}&q=[[at(document.type, "project")]]`
  )

  const { results } = await response.json()

  const projects = results.map(
    ({ id, data: { excerpt, image, links, order, title } }) => ({
      excerpt,
      id,
      order,
      title,
      image: image.thumb.url,
      links: links.map(({ link: { url } }) => url)
    })
  )

  return sortBy(projects, 'order')
}

export default () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      const key = await fetchKey()

      const projects = await fetchProjects(key)

      setProjects(projects)

      setLoading(false)
    }

    fetch()
  }, [])

  return (
    <main>
      <header>
        <img src={ali} alt="Ali Zahid" />
        <h1>I have a patent on blowing minds with epic design.</h1>
      </header>
      <section>
        {loading && <div className="loading" />}
        {projects.map(({ excerpt, id, image, links, title }) => (
          <article key={id}>
            <img src={image} alt={RichText.asText(title)} />
            <div>
              <h2>{RichText.asText(title)}</h2>
              {RichText.render(excerpt)}
              <nav>
                {links.map((link, index) => {
                  const label = (() => {
                    if (link.includes('github.com')) {
                      return 'GitHub'
                    } else if (link.includes('github.io')) {
                      return 'Demo'
                    } else if (link.includes('apple.com')) {
                      return 'App Store'
                    } else if (link.includes('google.com')) {
                      return 'Play Store'
                    } else {
                      return 'Web'
                    }
                  })()

                  return (
                    <a key={index} href={link}>
                      {label}
                    </a>
                  )
                })}
              </nav>
            </div>
          </article>
        ))}
      </section>
      <footer>
        <nav>
          <a href="https://github.com/alizahid" title="GitHub">
            <img src={github} alt="GitHub" />
          </a>
          <a href="https://twitter.com/alizahid0" title="Twitter">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="https://dribbble.com/alizahid" title="Dribbble">
            <img src={dribbble} alt="Dribbble" />
          </a>
        </nav>
      </footer>
    </main>
  )
}
