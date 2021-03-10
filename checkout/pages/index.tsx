import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Copy, Description, Features, Hero, Page, Title } from '../components'
import { content } from '../lib'
import { Reconciliation } from '../types'

interface Props {
  data: Reconciliation
}

const Home: NextPage<Props> = ({ data }) => (
  <>
    <Head>
      <title>Reconciliation / Checkout</title>
    </Head>

    <Page>
      <Copy>
        <Title
          animate={{
            opacity: 1
          }}
          initial={{
            opacity: 0
          }}
          transition={{
            delay: 0.2,
            duration: 0.2
          }}>
          {data.title}
        </Title>
        <Description
          animate={{
            opacity: 1
          }}
          initial={{
            opacity: 0
          }}
          transition={{
            delay: 0.4,
            duration: 0.2
          }}>
          {data.description}
        </Description>
        <Features
          animationDelay={0.6}
          features={data.features}
          icon={data.icon}
        />
      </Copy>
      <Hero animationDelay={1.2} />
    </Page>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const data = await content.fetch()

  return {
    props: {
      data
    }
  }
}

export default Home
