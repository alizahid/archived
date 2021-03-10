import { motion } from 'framer-motion'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import {
  ImageBackground,
  ImageCalendar,
  ImageLinks,
  ImageStatements,
  ImageTransactions
} from '../svg'

const Main = styled(motion.div)`
  align-items: center;
  display: flex;
  height: 680px;
  justify-content: center;
  position: relative;
  width: 680px;
`

const Background = styled(ImageBackground)`
  position: absolute;
`

const Calendar = styled(ImageCalendar)`
  position: absolute;
`
const Links = styled(ImageLinks)`
  position: absolute;
`
const Statements = styled(ImageStatements)`
  position: absolute;
`
const Transactions = styled(ImageTransactions)`
  position: absolute;
`

interface Props {
  animationDelay: number
}

export const Hero: FunctionComponent<Props> = ({ animationDelay }) => (
  <Main>
    <Main
      animate={{
        opacity: 1,
        scale: 1
      }}
      initial={{
        opacity: 0,
        scale: 1.2
      }}
      transition={{
        delay: 1.2 + animationDelay,
        duration: 0.2
      }}>
      <Background
        animate={{
          opacity: 0.2
        }}
        initial={{
          opacity: 1
        }}
        transition={{
          delay: 1.6 + animationDelay,
          duration: 2,
          repeat: Infinity,
          repeatType: 'mirror'
        }}
      />
    </Main>
    <Calendar
      animate={{
        opacity: 1,
        scale: 1,
        translateX: 0,
        translateY: 0
      }}
      initial={{
        opacity: 0,
        scale: 0,
        translateX: -272,
        translateY: -176
      }}
      transition={{
        delay: animationDelay,
        duration: 0.2
      }}
    />
    <Transactions
      animate={{
        opacity: 1,
        scale: 1,
        translateX: 0,
        translateY: 0
      }}
      initial={{
        opacity: 0,
        scale: 0
      }}
      transition={{
        delay: 0.2 + animationDelay,
        duration: 0.2
      }}
    />
    <Statements
      animate={{
        opacity: 1,
        scale: 1,
        translateX: 0,
        translateY: 0
      }}
      initial={{
        opacity: 0,
        scale: 0
      }}
      transition={{
        delay: 0.4 + animationDelay,
        duration: 0.2
      }}
    />
    <Links animationDelay={0.2 + animationDelay} />
  </Main>
)
